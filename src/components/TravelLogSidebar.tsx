'use client';

import { useState } from 'react';
import TravelLogsForm from './TravelLogsForm';

const TravelLogSideBar = () => {
  const [openSideBar, setOpenSideBar] = useState<boolean>(false);
  return (
    <>
      <div className="fixed top-2 right-2 z-[999]">
        <button
          className="btn btn-info"
          onClick={() => setOpenSideBar(!openSideBar)}
        >
          Create Travel Info
        </button>
      </div>
      {openSideBar && (
        <div className="fixed h-full menu p-4 w-[520px] bg-base-200 top-0 right-0 z-[999]">
          <TravelLogsForm
            onCancel={() => setOpenSideBar(false)}
            onComplete={() => setOpenSideBar(false)}
          />
        </div>
      )}
    </>
  );
};
export default TravelLogSideBar;
