import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableTransparency from '../../components/Tables/tables/TableTransparency';

const Tables = () => {
  return (
    <>
      {/* Breadcrumb for navigation */}
      <Breadcrumb pageName="Tables" />
            
      <div className="flex flex-col gap-10">
        {/* Table component */}
        <TableTransparency />
      </div>
    </>
  );
};

export default Tables;
