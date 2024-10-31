import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableBazzar from '../../components/Tables/tables/TableBazzar';

const Tables = () => {
  return (
    <>
      {/* Breadcrumb for navigation */}
      <Breadcrumb pageName="Tables" />
            
      <div className="flex flex-col gap-10">
        {/* Table component */}
        <TableBazzar />
      </div>
    </>
  );
};

export default Tables;
