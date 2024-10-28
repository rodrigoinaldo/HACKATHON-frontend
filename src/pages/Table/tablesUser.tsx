import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableTwo from '../../components/Tables/tables/TableUser';

const Tables = () => {
  return (
    <>
      {/* Breadcrumb for navigation */}
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        {/* Table component */}
        <TableTwo />
      </div>
    </>
  );
};

export default Tables;
