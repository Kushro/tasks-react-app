import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import useSemiPersistentState from "@/hooks/useSemiPersistentState";
import {useEffect, useReducer, useRef, useState} from "react";
import List from "@/components/List";
import SearchBar from "@/components/SearchBar";
import useAfterComponentMount from "@/hooks/useAfterComponentMount";
import useBeforeComponentMount from "@/hooks/useBeforeComponentMount";
import {Task} from "@/types/task.type";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const API_ENDPOINT = 'https://jsonplaceholder.typicode.com/todos?userId=1'

  const [searchTerm, setSearchTerm] = useSemiPersistentState("searchTerm", '');

  const tasksReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'fetch_init':
        return {
            ...state,
            isLoading: true,
            isError: false
        }
      case 'fetch_ok':
        return {
            ...state,
            isLoading: false,
            isError: false,
            data: action.payload
        }
      case 'fetch_error':
        return {
            ...state,
            isLoading: false,
            isError: true
        }
      case 'filter':
        return {
            ...state,
            searchTerm: action.payload
        }
      case 'remove':
        return {
            ...state,
            data: state.data.filter((task: Task) => task.id !== action.payload)
        }
      default:
        throw new Error();
    }
  }

  const [tasksHub, tasksCommand] = useReducer(tasksReducer, {
      data: [],
      isLoading: false,
      isError: false,
      searchTerm: searchTerm
  });

  useEffect(() => {
    tasksCommand({type: 'fetch_init'});

    fetch(API_ENDPOINT)
        .then(response => response.json())
        .then(result => {
            tasksCommand({type: 'fetch_ok', payload: result})
        })
        .catch(() => tasksCommand({type: 'fetch_error'}));
  }, []);

  const searchHandler = (term: string) => {
    setSearchTerm(term);

    tasksCommand({type: 'filter', payload: term})
  }

  function filteredTasks () {
      return tasksHub.data.filter((task: Task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  const removeTaskHandler = (id: number) => {
    tasksCommand({type: 'remove', payload: id})
  }

  useAfterComponentMount(() => {
    console.log('searchTerm loaded: ', searchTerm);
    searchHandler(searchTerm);
  }, [searchTerm]);

  return (
    <div className='bg-white ring-1 ring-gray-900/5 rounded-lg w-1/2 m-auto p-6'>
      <Head>
        <title>Awesome Tasks List App</title>
      </Head>

      {tasksHub.isLoading && <div className='text-center'>Loading...</div>}
      {!tasksHub.isLoading && tasksHub.data.length === 0 && <div className='text-center'>No tasks found</div>}
      {!tasksHub.isLoading && tasksHub.data.length > 0 &&
          <List items={filteredTasks()} removeTaskHandler={removeTaskHandler}>
            <h1 className='text-4xl border-b-2 border-b-blue-400 font-serif'>Task List</h1>
            <SearchBar search={searchTerm} searchHandler={searchHandler} />
          </List>
      }
    </div>
  )
}
