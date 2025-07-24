import React from 'react'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const NewsSectionLoading = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 py-12">
      {/* Large news skeleton */}
      <div className="h-full w-full">
        <div className=" rounded-lg overflow-hidden">
          <Skeleton height={300} />
          <div className="p-6">
            <Skeleton width={80} height={20} className="mb-2" />
            <Skeleton count={2} height={24} className="mb-3" />
            <Skeleton width={150} height={16} />
          </div>
        </div>
      </div>

      {/* Small news skeletons */}
      <div className="grid gap-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex gap-4 p-4 rounded-lg">
            <Skeleton width={120} height={80} />
            <div className="flex-1">
              <Skeleton width={60} height={16} className="mb-2" />
              <Skeleton count={2} height={18} className="mb-2" />
              <Skeleton width={100} height={14} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NewsSectionLoading;