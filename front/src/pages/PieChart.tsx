import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';
import create,{SetState} from 'zustand';
import axios from 'axios';



type Address={
    street?:string | any;
    city?:string | any;
  }
  
  
    type DataSourceType = {
      id: React.Key;
      name?: string;
      email?: string;
      gender?: string;
      address?: Address;
      phone?: string;
      update_at?: string;
      children?: DataSourceType[];
    };

    type StoreState = {
        arr: DataSourceType | DataSourceType[]  | any;
        fetchData: () => Promise<void>;
      };


const useStore = create<StoreState>((set: SetState<StoreState>) => ({
  arr: [],
  fetchData: async () => {
    try {

      const response = await axios.get('http://localhost:8800/auth-person');
      set({arr: response.data});
      
    } catch (error) {
      console.log(error)
    }
    
    
  },
}));

const PieChart = () => {
    const {  arr,fetchData } = useStore();
    const [data,setData]=useState<any>([])

    useEffect(()=>{
        fetchData()
    },[fetchData])

    useEffect(()=>{
       
        const counts = arr.reduce((acc:any,person:any)=>{
            if (!acc[person.address.city]) {
                acc[person.address.city] = 1;
              } else {
                acc[person.address.city]++;
              }
              return acc;
        },[])
       
        const data = Object.entries(counts).map(([type, value]) => ({ type, value }));

        console.log(data)
        setData(data)
        
    },[arr])


   
      const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        label: {
          type: 'inner',
          offset: '-30%',
          content: ({ percent }:any) => `${(percent * 100).toFixed(0)}%`,
          style: {
            fontSize: 20,
            textAlign: 'center',
          },
        },
        interactions: [
          {
            type: 'element-active',
          },
        ],
      };


  return (
    <div>
     <Pie {...config} />
    </div>
  )
}

export default PieChart
