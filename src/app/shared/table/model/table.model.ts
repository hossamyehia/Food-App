import TableImage from "./tableImages.model";
import TableObj from "./tableObj.model";
import TableOperators from "./tableOperators.model";

interface Table{
    headers: {[key: string]: string};
    data: any[];
    operators:  TableOperators;
    images: TableImage[];
    arrOfObj: TableObj[];
    objs: TableObj[];
}
export default Table;