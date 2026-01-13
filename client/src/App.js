import React, { useState, useEffect, useCallback } from 'react'
import { useQueryParam, NumberParam, withDefault } from 'use-query-params';

import { SecondaryButton } from './components/Button'
import AddSubscriberModal from './components/AddSubscriberModal'
import SubscriberStatusModal from './components/SubscriberStatusModal'
import SubscriberTable from './components/SubscriberTable'
import TablePagination from './components/TablePagination'
import LoadingSpinner from './components/LoadingSpinner'

// Services
import { getSubscribers } from './services/subscriber'

// Styles
import './App.css';

function App() {
  const [page, setPage] = useQueryParam(
    'page',
    withDefault(NumberParam, 1)
  );
  const [perPage] = useQueryParam(
    'perPage',
    withDefault(NumberParam, 25)
  );
  const [showAddModal, setShowAddModal] = useState(false)
  const [focusedSubscriberId, setFocusedSubscriberId] = useState('')
  const [focusedSubscriberStatus, setFocusedSubscriberStatus] = useState('')
  const [subscribers, setSubscribers] = useState([])
  const [pagination, setPagination] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const [errorMessage, setErrorMessage] = useState('');

  const refreshSubscribers = useCallback(() => {
    const params = {
      page,
      per_page: perPage
    }

    setIsLoading(true)
    getSubscribers(params)
    .then((payload) => {
      const subscribers = payload?.data?.subscribers || []
      const pagination = payload?.data?.pagination || {}

      setSubscribers(subscribers)
      setPagination(pagination)
    })
    .catch((payload) => {
      const error = payload?.response?.data?.message || 'Something went wrong'
      console.error(error)
    })
    .finally(() => {
      setIsLoading(false)
    })
  }, [page, perPage]);

  useEffect(() => {
    refreshSubscribers()
  }, [refreshSubscribers]);

  const onPageSelected = (page) => {
    setPage(page)
  }

  const onOpenAddSubscriber = () => {
    setShowAddModal(true)
  }

  const onCloseAddSubscriberModal = () => {
    setShowAddModal(false)
  }

  const onSuccessAddSubscriber = () => {
    setShowAddModal(false)
    refreshSubscribers()
  }

  const onUpdateStatusSelectected = (subscriberId, status) => {
    setFocusedSubscriberId(subscriberId)
    setFocusedSubscriberStatus(status)
  }

  const onCloseUpdateStatusSubscriberModal = () => {
    setFocusedSubscriberId('')
    setFocusedSubscriberStatus('')
  }

  const onSuccessUpdateStatusSubscriber = () => {
    setFocusedSubscriberId('')
    setFocusedSubscriberStatus('')
    refreshSubscribers()
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* ⚠️ Error notification */}
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{errorMessage}</span>
            <span
              className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer"
              onClick={() => setErrorMessage('')}
            >
              <svg className="fill-current h-6 w-6 text-red-500" role="button" viewBox="0 0 20 20">
                <title>Close</title>
                <path d="M14.348 5.652a1 1 0 00-1.414 0L10 8.586 7.066 5.652A1 1 0 105.652 7.066L8.586 10l-2.934 2.934a1 1 0 101.414 1.414L10 11.414l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934a1 1 0 000-1.414z"/>
              </svg>
            </span>
          </div>
        )}
        <AddSubscriberModal
          isOpen={showAddModal}
          onClose={onCloseAddSubscriberModal}
          onSuccess={onSuccessAddSubscriber}
          onError={setErrorMessage} 
        />
        <SubscriberStatusModal
          isOpen={focusedSubscriberId !== '' && focusedSubscriberStatus !== ''}
          onClose={onCloseUpdateStatusSubscriberModal}
          onSuccess={onSuccessUpdateStatusSubscriber}
          onError={setErrorMessage}
          subscriberId={focusedSubscriberId}
          status={focusedSubscriberStatus}
          refreshSubscribers={refreshSubscribers}
        />
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold flex items-center">
            {pagination?.total} Subscribers {isLoading && <LoadingSpinner className="ml-4" />}
          </h1>
          <SecondaryButton onClick={onOpenAddSubscriber}>
            Add Subscriber
          </SecondaryButton>
        </div>
        <div className="mt-6">
          <SubscriberTable
            subscribers={subscribers}
            onChangeStatusSelected={onUpdateStatusSelectected}
          />
          <TablePagination pagination={pagination} onPageSelected={onPageSelected} />
        </div>
      </main>
    </div>
  );
}

export default App;
