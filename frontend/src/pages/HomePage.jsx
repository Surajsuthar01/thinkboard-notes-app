import { useEffect, useState } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import { LogOutIcon } from "lucide-react";


import RateLimitedUI from "../components/RateLimitedUI";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";


const HomePage = () => {
  const [isRateLimited, setIsRateLimited]=useState(false);
  const [notes,setNotes]=useState([])
  const [londing,setLoading]=useState(true)

 useEffect(()=> {
  const fetchNotes = async () => {
      try{
        // const res= await fetch("http://localhost:5001/api/notes")
        // const data= await res.json();
        //optional but use the modern and convient methods
        const res= await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);

      }catch(error){
        console.log("Error fetching Notes");
        console.log(error);
        if(error.response?.status ==429){
          setIsRateLimited(true)
        } else{
          toast.error("Faliled to load notes");
        }
      }
      finally{
        setLoading(false);
      }
  };
  fetchNotes();
 }, []);

  return (
    <div className="min-h-screen">
    {isRateLimited && <RateLimitedUI />}
    <div className="max-w-7xl mx-auto  p-4 mt-28">
      {londing &&  <div className="text-center text-primary py-10">Loding notes....</div> }

      {notes.length === 0 && !isRateLimited && <NotesNotFound/>}

      {notes.length>0 && !isRateLimited &&(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note =>(
           <NoteCard key={note._id} note={note} setNotes ={setNotes}/>
          )))}
        </div>
      )}
    </div>
  </div>
  );
};

export default HomePage;
