import { mapEventsToSortedSections } from './mapEventsToSortedSections';

describe('mapEventsToSortedSections', () => {
  it('returns an empty array when no event is given', () => {
    expect(mapEventsToSortedSections([])).toMatchInlineSnapshot(`Array []`);
  });

  it('returns one section when one event is given', () => {
    const events = [
      {
        id: '1',
        title: 'e1',
        startDate: new Date('2020-01-01'),
        endDate: new Date('2020-01-01'),
      },
    ];

    expect(mapEventsToSortedSections(events)).toMatchInlineSnapshot(`
      Array [
        Object {
          "data": Array [
            Object {
              "endDate": 2020-01-01T00:00:00.000Z,
              "id": "1",
              "startDate": 2020-01-01T00:00:00.000Z,
              "title": "e1",
            },
          ],
          "title": "2020-01-01",
        },
      ]
    `);
  });

  it('sort events into same section for same date', () => {
    const events = [
      {
        id: '1',
        title: 'e1',
        startDate: new Date('2020-01-01'),
        endDate: new Date('2020-01-01'),
      },
      {
        id: '2',
        title: 'e2',
        startDate: new Date('2020-01-02'),
        endDate: new Date('2020-01-02'),
      },
      {
        id: '3',
        title: 'e3',
        startDate: new Date('2020-01-01'),
        endDate: new Date('2020-01-01'),
      },
    ];

    expect(mapEventsToSortedSections(events)).toMatchInlineSnapshot(`
      Array [
        Object {
          "data": Array [
            Object {
              "endDate": 2020-01-01T00:00:00.000Z,
              "id": "1",
              "startDate": 2020-01-01T00:00:00.000Z,
              "title": "e1",
            },
            Object {
              "endDate": 2020-01-01T00:00:00.000Z,
              "id": "3",
              "startDate": 2020-01-01T00:00:00.000Z,
              "title": "e3",
            },
          ],
          "title": "2020-01-01",
        },
        Object {
          "data": Array [
            Object {
              "endDate": 2020-01-02T00:00:00.000Z,
              "id": "2",
              "startDate": 2020-01-02T00:00:00.000Z,
              "title": "e2",
            },
          ],
          "title": "2020-01-02",
        },
      ]
    `);
  });

  it('expands into multiple entries when events spans multiple days', () => {
    const events = [
      {
        id: '1',
        title: 'e1',
        startDate: new Date('2020-01-01'),
        endDate: new Date('2020-01-03'),
      },
      {
        id: '2',
        title: 'e2',
        startDate: new Date('2020-01-02'),
        endDate: new Date('2020-01-02'),
      },
    ];

    expect(mapEventsToSortedSections(events)).toMatchInlineSnapshot(`
      Array [
        Object {
          "data": Array [
            Object {
              "endDate": 2020-01-03T00:00:00.000Z,
              "id": "1",
              "startDate": 2020-01-01T00:00:00.000Z,
              "title": "e1",
            },
          ],
          "title": "2020-01-01",
        },
        Object {
          "data": Array [
            Object {
              "endDate": 2020-01-03T00:00:00.000Z,
              "id": "1",
              "startDate": 2020-01-01T00:00:00.000Z,
              "title": "e1",
            },
            Object {
              "endDate": 2020-01-02T00:00:00.000Z,
              "id": "2",
              "startDate": 2020-01-02T00:00:00.000Z,
              "title": "e2",
            },
          ],
          "title": "2020-01-02",
        },
        Object {
          "data": Array [
            Object {
              "endDate": 2020-01-03T00:00:00.000Z,
              "id": "1",
              "startDate": 2020-01-01T00:00:00.000Z,
              "title": "e1",
            },
          ],
          "title": "2020-01-03",
        },
      ]
    `);
  });
});
