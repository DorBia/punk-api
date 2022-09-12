import { useState, useEffect } from "react"

const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        fetch(url)
        .then(response => {
          if(!response.ok) {
            throw new Error ("couldn't fetch the data");
          }
          return  response.json();
        })
        .then(json => {
          setIsPending(false)
          setData(json)
        })
      }, [url])
    return { data, isPending };
//     useEffect(() => {
//       const fetchData = async (url) => {

//       const res = await fetch(url);

//       const json = await res.json();

//       setData(json);
//   }
//   fetchData(url)
// }, [url])
//     console.log(data);
}

export default useFetch