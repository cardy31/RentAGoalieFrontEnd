import * as React from 'react';

// Stolen from here: https://engineering.shopify.com/blogs/engineering/building-data-table-component-react
export default function Cell({
                                 content,
                                 header,
                             }) {

    const cellMarkup = header ? (
        <th className="Cell Cell-header">
            {content}
        </th>
    ) : (
        <td className="Cell">
            {content}
        </td>
    );

    return (cellMarkup);
}