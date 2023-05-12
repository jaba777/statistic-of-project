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

console.log(ProFormRadio.Group)


const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

type DataSourceType = {
  id: React.Key;
  title?: string;
  readonly?: string;
  decs?: string;
  scoringMethod?: string;
  created_at?: string;
  update_at?: string;
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = [
  {
    id: 624748504,
    title: 'first',
    readonly: '活动名称一',
    decs: '这个活动真好玩',
    scoringMethod: 'male',
    created_at: '1590486176000',
    update_at: '1590486176000',
  },
  {
    id: 624691229,
    title: 'second',
    readonly: '活动名称二',
    decs: '这个活动真好玩',
    scoringMethod: 'male',
    created_at: '1590481162000',
    update_at: '1590481162000',
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
      dataIndex: 'title',
      tooltip: '只读，使用form.getFieldValue获取不到值',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules:
            rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : [],
        };
      },
      
      editable: (text, record, index) => {
        return index !== 0;
      },
      width: '15%',
    },
    {
      title: '活动名称二',
      dataIndex: 'desc',
      tooltip: '只读，使用form.getFieldValue可以获取到值',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules:
            rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : [],
        };
      },
      width: '15%',
    },
    {
      title: '计分方式',
      dataIndex: 'scoringMethod',
      valueType: 'select',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules:
            rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : [],
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
            // 每次选中重置参数
            editableFormRef.current?.setRowData?.(rowIndex, { fraction: [] });
          },
        };
      },
    },
    {
      title: '描述',
      dataIndex: 'decs',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules:
            rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : [],
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
    },
    {
      title: '活动时间',
      dataIndex: 'created_at',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules:
            rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : [],
        };
      },
    },
    {
      title: '操作',
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
        headerTitle="可编辑表格"
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
            console.log(data );
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
