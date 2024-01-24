import React from 'react'

const Dashboard = () => {
  return (
    <div>
        <div className='text-teal-600 font-bold text-xl'>Today's Trend</div>
        <div>
        <dl className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-4 dark:text-white sm:p-8">
            <div className="flex flex-col items-center justify-center bg-teal-500 p-6 w-auto col-span-2 sm:col-span-1 rounded-lg">
                <dt className="mb-2 text-3xl font-extrabold">74,000 Rwf</dt>
                <dd className="text-gray-800 teal:text-gray-400 font-bold">Total Purchase</dd>
            </div>
            <div className="flex flex-col items-center justify-center bg-teal-500 p-6 col-span-2 sm:col-span-1 rounded-lg">
                <dt className="mb-2 text-3xl font-extrabold">56,000,00</dt>
                <dd className="text-gray-800 teal:text-gray-400 font-bold">Total Kgs Cherry A</dd>
            </div>
            <div className="flex flex-col items-center justify-center bg-teal-500 p-6 col-span-2 sm:col-span-1 rounded-lg">
                <dt className="mb-2 text-3xl font-extrabold">1000s</dt>
                <dd className="text-gray-800 teal:text-gray-400 font-bold">Total Kgs Cherry B</dd>
            </div>
            <div className="flex flex-col items-center justify-center bg-teal-500 p-6 col-span-2 sm:col-span-1 rounded-lg">
                <dt className="mb-2 text-3xl font-extrabold">67,000</dt>
                <dd className="text-gray-800 teal:text-gray-400 font-bold">Contributors</dd>
            </div>
        </dl>

            </div>
    </div>
  )
}

export default Dashboard