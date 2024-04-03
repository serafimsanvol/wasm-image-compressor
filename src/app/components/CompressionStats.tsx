import React from 'react';

const toKilobytesWithTwoDecimals = (bytes: number) => {
  return Math.round((bytes / 1000) * 100) / 100;
};

const CompressionStats = ({
  before,
  after,
}: {
  before: number;
  after: number;
}) => {
  const savedInBytes = before - after;
  const saved = toKilobytesWithTwoDecimals(savedInBytes);
  const percentage = ((savedInBytes / before) * 100).toFixed(2);

  return (
    <div>
      <p>size before: {toKilobytesWithTwoDecimals(before)} kilobytes</p>
      <p>size after: {toKilobytesWithTwoDecimals(after)} kilobytes</p>
      <p>saved: {saved} kilobytes</p>
      {percentage}%
    </div>
  );
};

export default CompressionStats;
