import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableImage from '../../components/Tables/tables/TableImage';

const Tables = () => {
  return (
    <>
      {/* Breadcrumb for navigation */}
      <Breadcrumb pageName="Tables" />
            
      <div className="flex flex-col gap-10">
        {/* Table component */}
        <TableImage />
      </div>
    </>
  );
};

export default Tables;
