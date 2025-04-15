/* eslint-disable react/prop-types */
import { Input } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useDataStore } from '../../store/Global';
import { getBanks } from '../../apis/account';

const RecipientBank = ({goNext,editMode}) => {
  const {data,updateData,setBank}=useDataStore()
 const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [banks, setBanks] = useState([]); // List of banks

  // Filter banks based on the search term
  const filteredBanks = banks?.filter((bank) =>
    bank?.name.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  const selectBank=(bank)=>{
    console.log('selected bank:',bank);
    // console.log({recipient_accountDetails:{...data.recipient_accountDetails,bank_name:bank.name}});
    updateData({recipient_accountDetails:{...data.recipient_accountDetails,bank_name:bank.name}})
    setBank(bank)
    if (!editMode) {
    goNext()   
  }
  }

  
  useEffect(() => {
    async function fetchData() {
      const result = await getBanks();
      console.log(result.data.data);
      setBanks(result.data.data);
    }
    fetchData();
  }, []);

  return (
   <div className={`${!editMode&&'min-h-screen'}  flex flex-col p-8 bg-white`}>
    {!editMode &&
   <div className='mb-4'>
      <h1 className="text-2xl font-bold mb-2">Select Recipient&apos;s Bank</h1>
      <p>Recipient pays no fee</p>
   </div>
    }
      <div className="w-full">
        {/* Search Input */}
        <Input
        size='lg'
          type="text"
          placeholder="Search for a bank..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='mb-8'
        />

        {/* List of Banks */}
        <div className="flex flex-col gap-4 h-[30rem] overflow-hidden overflow-y-auto">
          {filteredBanks.length > 0 ? (
            filteredBanks.map((bank, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg hover:bg-gray-100 cursor-pointer"
                onClick={()=>selectBank(bank)}
              >
              <p className='text-lg'>{bank.name}</p>
              </div>
            ))
          ) : (
            <p className="p-4 text-gray-500">No banks found.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default RecipientBank