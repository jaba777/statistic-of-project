import React from 'react'
import './Home.scss';
import { useState,useRef } from 'react';

import type { ProColumns } from '@ant-design/pro-components';
import {
  EditableProTable,
  ProCard,
  ProFormField,
  ProFormRadio,
  EditableFormInstance
} from '@ant-design/pro-components';




const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

type Address={
  street?:string | any;
  city?:string | any;
}

type DataSourceType = {
  id: React.Key;
  name?: string;
  email?: string;
  gender?: string;
  address?:Address;
  
  phone?:string;
  update_at?: string;
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = [
  {
    id: 624748504,
    name: 'first',
    email: 'ajdsdh',
    address: {
      street: 'sdf',
      city: 'New York',
    },
    gender: 'male',
    phone: '1590486176000',
   
  },
  {
    id: 624691229,
    name: 'second',
    email: 'adfasdf',
    address: {
      street: 'rgg',
      city: 'dgdfgh',
    },
    gender: 'male',
    phone: '1590481162000',
    
  },
];

const Home = () => {


  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);
  const [position, setPosition] = useState<'top' | 'bottom' | 'hidden'>(
    'bottom',
  );
  const editableFormRef = useRef<EditableFormInstance>();

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: 'name',
      dataIndex: 'name',
      
      formItemProps: (form, { rowIndex }) => {
        return {
          rules:
            rowIndex > 1 ? [{ required: true, message: 'fill input' }] : [],
        };
      },
      
      editable: (text, record, index) => {
        return index !== 0;
      },
      width: '10%',
    },
    {
      title: 'email',
      dataIndex: 'email',
      
      formItemProps: (form, { rowIndex }) => {
        return {
          rules:
            rowIndex > 1 ? [{ required: true, message: 'fill input' }] : [],
        };
      },
      
      width: '10%',
    },
    {
      title: 'gender',
      dataIndex: 'gender',
      valueType: 'select',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules:
            rowIndex > 1 ? [{ required: true, message: 'fill input' }] : [],
        };
      },
      request: async () => [
        {
          value: 'male',
          label: 'male',
        },
        {
          value: 'female',
          label: 'female',
        },
      ],
      fieldProps: (_, { rowIndex }) => {
        return {
          onSelect: () => {
           
            editableFormRef.current?.setRowData?.(rowIndex, { fraction: [] });
          },
        };
      },
    },
    {
      title: 'street',
      dataIndex: 'street',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules:
            rowIndex > 1 ? [{ required: true, message: 'fill input' }] : [],
        };
      },
      fieldProps: (form, { rowKey, rowIndex }) => {
        if (form.getFieldValue([rowKey || '', 'title']) === '不好玩') {
          return {
            disabled: true,
          };
        }
        if (rowIndex > 9) {
          return {
            disabled: true,
          };
        }
        return {};
      },
      render: (_, row) => <>{row?.address?.street}</>,
    },
    {
      title: 'city',
      dataIndex: 'city',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules:
            rowIndex > 1 ? [{ required: true, message: 'fill input' }] : [],
        };
        
      },
      fieldProps: (form, { rowKey, rowIndex }) => {
        if (form.getFieldValue([rowKey || '', 'title']) === '不好玩') {
          return {
            disabled: true,
          };
        }
        if (rowIndex > 9) {
          return {
            disabled: true,
          };
        }
        return {};
      },
      render: (_, row) => <>{row?.address?.city}</>,
    },
    
    {
      title: 'phone',
      dataIndex: 'phone',
      
      formItemProps: (form, { rowIndex }) => {
        return {
          rules:
            rowIndex > 1 ? [{ required: true, message: 'fill input' }] : [],
        };
      },
    },
    {
      title: 'operation',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <button
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          update
        </button>,
        <button
          key="delete"
          onClick={() => {
            setDataSource(dataSource.filter((item) => item.id !== record.id));
          }}
        >
          delete
        </button>,
      ],
    },
  ];



  return (
    <div>
      <h1>Home</h1>

      <div className="timetable">
      <EditableProTable<DataSourceType>
        rowKey="id"
      
        maxLength={5}
        
        editableFormRef={editableFormRef}
        scroll={{
          x: 960,
        }}
        recordCreatorProps={
          position !== 'hidden'
            ? {
                position: position as 'top',
                record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
              }
            : false
        }
        loading={false}
        toolBarRender={() => [
          <ProFormRadio.Group
            key="render"
            fieldProps={{
              value: position,
              onChange: (e) => setPosition(e.target.value),
            }}
            options={[
              {
                label: 'top',
                value: 'top',
              },
              {
                label: 'bottom',
                value: 'bottom',
              },
              {
                label: 'hidden',
                value: 'hidden',
              },
            ]}
          />,
        ]}
        columns={columns}
        request={async () => ({
          data: defaultData,
          total: 3,
          success: true,
        })}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, data, row) => {
           
            await waitTime(2000);
          },
          onChange: setEditableRowKeys,
        }}
      />


    
      </div>

    </div>
  )
}

export default Home
