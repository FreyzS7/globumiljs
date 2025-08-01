import React from 'react';

export default function Pagination({
  total = 0,
  page = 1,
  pageSize = 10,
  onPageChange = () => {},
  onPageSizeChange = null,
  pageSizeOptions = [6, 9, 12],
  className = '',
}) {
  const totalPages = Math.ceil(total / pageSize) || 1;

  const getPaginationNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (page <= 2) {
      return [1, 2, '...', totalPages];
    }
    if (page >= totalPages - 1) {
      return [1, '...', totalPages - 1, totalPages];
    }
    return [1, '...', page, '...', totalPages];
  };

  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      <div className="bg-white rounded-full px-10 py-4 flex items-center gap-4 shadow-sm">
        <button className="text-2xl px-2 hover:opacity-70" onClick={() => onPageChange(1)} disabled={page === 1}>{'<<'}</button>
        <button className="text-2xl px-2 hover:opacity-70" onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page === 1}>{'<'}</button>
        {getPaginationNumbers().map((num, idx) => (
          typeof num === 'number' ? (
            <button
              key={num}
              className={`text-xl px-2 ${num === page ? 'font-semibold' : ''}`}
              onClick={() => onPageChange(num)}
              disabled={num === page}
            >
              {num}
            </button>
          ) : (
            <span key={idx} className="text-xl px-2">....</span>
          )
        ))}
        <button className="text-2xl px-2 hover:opacity-70" onClick={() => onPageChange(Math.min(totalPages, page + 1))} disabled={page === totalPages}>{'>'}</button>
        <button className="text-2xl px-2 hover:opacity-70" onClick={() => onPageChange(totalPages)} disabled={page === totalPages}>{'>>'}</button>
        {onPageSizeChange && (
          <select
            value={pageSize}
            onChange={onPageSizeChange}
            className="ml-6 border rounded px-3 py-1 text-sm"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>{size} / page</option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
} 