import type { Event } from '../context/SimpleStore';
import { formatISO, differenceInDays, addDays, compareAsc } from 'date-fns';

export type EventSection = {
  title: string;
  data: Event[];
};

export const mapEventsToSortedSections = (events: Event[]): EventSection[] => {
  const expandedEvents: Record<string, Event[]> = {};

  events.forEach((event) => {
    const st = formatISO(event.startDate, { representation: 'date' });

    if (!expandedEvents[st]) {
      expandedEvents[st] = [];
    }

    expandedEvents[st].push(event);

    let currentDate = event.startDate;
    while (differenceInDays(event.endDate, currentDate) > 0) {
      currentDate = addDays(currentDate, 1);
      const date = formatISO(currentDate, { representation: 'date' });
      if (!expandedEvents[date]) {
        expandedEvents[date] = [];
      }
      expandedEvents[date].push(event);
    }
  });

  const sections = Object.keys(expandedEvents)
    .sort((a, b) => compareAsc(new Date(a), new Date(b)))
    .map((key) => {
      return {
        title: key,
        // TODO: might need to be sorted be time
        data: expandedEvents[key],
      };
    });

  return sections;
};
