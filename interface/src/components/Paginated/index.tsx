import { useState } from "react";
import ReactPaginate from "react-paginate";
import { CardProcess } from "../CardProcess";
import { PropsPaginated } from "../../interfaces/Process";


export function Paginated({ itemsPerPage, cardsProcessed }:PropsPaginated) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState<number>(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = cardsProcessed.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(cardsProcessed.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event:any) => {
    const newOffset = (event.selected * itemsPerPage) % cardsProcessed.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      {currentItems && 
        currentItems.map((response, index) => (
          <CardProcess
            key={index}
            id={response.id}
            name={response.name}
            documentation={response.documentation}
            diff_days={response.diff_days}
          />
        ))}
      <ReactPaginate
        className=""
        breakLabel="..."
        previousLabel="<"
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        containerClassName={'flex gap-2 mt-auto text-lg'}
        previousClassName={" font-bold w-7 h-7 flex justify-center items-center hover:bg-slate-200 rounded-full"}
        nextClassName={"font-bold w-7 h-7 flex justify-center items-center hover:bg-slate-200 rounded-full "}
        activeClassName={'w-7 h-7 flex justify-center bg-slate-300 items-center hover:bg-slate-400 rounded-full '}
        breakClassName={'item break-me '}
        disabledClassName={'text-slate-400 cursor-aut hover:bg-transparent o'}
        pageClassName={'w-7 h-7 flex justify-center items-center hover:bg-slate-200 rounded-full '}
      />
    </>
  );
}