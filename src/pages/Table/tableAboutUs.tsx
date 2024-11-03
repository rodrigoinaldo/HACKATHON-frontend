import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableAboutUs from '../../components/Tables/tables/TableAboutUs';

const Tables = () => {
  return (
    <>
      {/* Breadcrumb for navigation */}
      <Breadcrumb pageName="Tables" />
            
      <div className="flex flex-col gap-10">
        {/* Table component */}
        <TableAboutUs />
      </div>
    </>
  );
};

export default Tables;
