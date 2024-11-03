import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableEvent from '../../components/Tables/tables/TableEvent';

const Tables = () => {
  return (
    <>
      {/* Breadcrumb for navigation */}
      <Breadcrumb pageName="Tables" />
            
      <div className="flex flex-col gap-10">
        {/* Table component */}
        <TableEvent />
      </div>
    </>
  );
};

export default Tables;
