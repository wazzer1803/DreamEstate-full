
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header()  {

  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <header className='bg-orange-200 shadow-xl'>
   <div className='flex justify-between items-center max-w-6xl mx-auto pt-3 pb-3'>
   <Link to='/'>
   <h1 className='font-bold text-sm sm:text-3xl flex flex-wrap'>
        <span   className='text-blue-700'>Dream</span>
        <span className='text-slate-700'>Estate</span>
    </h1>
   </Link>
    <form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg flex text-sm md:text-md'>
      <input type="text" placeholder='Search.....' className="bg-transparent focus:outline-none w-24 sm:w-64 font-bold" value={searchTerm} onChange={(e)=>{
setSearchTerm(e.target.value);
      }}/>
      <button>
      <FaSearch className='bg-slate-500 bg-transparent mt-1'/>

      </button>
    </form>
    <ul className='flex gap-5 text-lg '>
      <Link to='/'>
      <li className='hidden sm:inline text-lg  font-semibold text-slate-800 hover:underline'>Home</li>
      </Link>
<Link to='/about'>
      <li className='hidden sm:inline text-lg font-semibold text-slate-800 hover:underline'>About</li>
</Link>
<Link to ='/profile'>
  {
  currentUser? (<img
    className='rounded-full h-10 w-10 object-cover'
    src={currentUser.avatar}
    alt='profile'
    />) : 
      (<li className='hidden sm:inline text-slate-800 hover:underline'>Sign In</li>)
}
</Link>
    </ul>
    {/* <div>
      asdad
    </div> */}
    
    </div>   

    </header>
  )
}


