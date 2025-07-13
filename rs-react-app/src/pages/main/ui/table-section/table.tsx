import React from 'react';
import { TableItem } from './table-item';
import type { CardListType } from '@/shared';

export class Table extends React.Component<CardListType> {
  render() {
    const { data } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {data instanceof Error ? (
            <tr>
              <p>Error: {data.message}</p>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={index}>
                <TableItem key={index} {...item} />
              </tr>
            ))
          )}
        </tbody>
      </table>
    );
  }
}
