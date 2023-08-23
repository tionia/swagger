/* grid container inteface */
export interface IGridContainer {
    children?: React.ReactNode,
}

/* grid container html */
function GridContainer({children}: IGridContainer) {
  return (
    <div className='px-10 py-8 max-w-full items-center'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
        {children}
      </div>
    </div>
  );
}

export default GridContainer;