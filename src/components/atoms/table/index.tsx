import { FC } from 'react';

export type TableProps = {
  columns: {
    name: string;
    value: string;
  }[];
  data: any;
};

const Table: FC<TableProps> = ({ columns, data}) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-6 m-5">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {columns &&
            columns.map(({ name, value }) => (
              <th scope="col" className="px-6 py-3" key={value}>
                {name}
              </th>
            ))}
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((d: any) => (
            <tr key={d.id} className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
              {Object.keys(d).map((key: any) => (
                <td className="border border-slate-700 px-6 py-4" key={d[key]}>
                  {d[key]}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
    </div>
  );
};

export default Table;
