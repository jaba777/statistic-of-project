import React from 'react'
import './Home.scss';
import create,{SetState} from 'zustand';
import { useState,useRef,useEffect } from 'react';
import axios from 'axios';

import type { ProColumns } from '@ant-design/pro-components';
import {
  EditableProTable,
  ProCard,
  ProFormField,
  ProFormRadio,
  EditableFormInstance
} from '@ant-design/pro-components';


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

type StoreState = {
  data: DataSourceType[];
  fetchData: () => Promise<void>;
};

interface MyState {
  myObject: DataSourceType
  setMyObject: (obj: DataSourceType) => void
}


const useStore = create<StoreState>((set: SetState<StoreState>) => ({
  data: [],
  fetchData: async () => {
    const response = await axios.get('http://localhost:8800/auth-person');
    set({data: response.data});
    
  },
}));

const addStoreHandler = create<MyState>((set) => ({
  myObject: {} as DataSourceType,
  setMyObject: async (myObject: DataSourceType) => {
    try {
      const response = await axios.post<DataSourceType>('http://localhost:8800/add-person',myObject);
      set({myObject})
    } catch (error) {
      
    }
},
}))



const Home = () => {
  const {  data,fetchData } = useStore();
  const {setMyObject} = addStoreHandler();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);
  const [position, setPosition] = useState<'top' | 'bottom' | 'hidden'>(
    'bottom',
  );
  const editableFormRef = useRef<EditableFormInstance>();

  useEffect(() => {
    fetchData();
  }, []);

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
      dataIndex: 'address',
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
      dataIndex: 'address',
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
          x: 960
        }}
        recordCreatorProps={
          position !== 'hidden'
            ? {
                position: 'bottom',
                record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
                creatorButtonText: 'Add'
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
          data: data,
          total: 8,
          success: true,
        })}
        value={data}
        onChange={setDataSource}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, data, row) => {

            /*setMyObject({
              id: data.id,
              name:data.name,
              gender: data.gender,
              address: {
                street: data.address?.street,
                city: data.address?.city
              },
              phone: data.phone
            })*/
           
            console.log(data)
           
          },
          onChange: setEditableRowKeys,
          
        }}
      />


    
      </div>

    </div>
  )
}

export default Home
