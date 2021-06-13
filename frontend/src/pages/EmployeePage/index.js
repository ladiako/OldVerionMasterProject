import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddEditEmployee from "./AddEditEmployee";
import { getListEmployees} from "../../stores/reducers/employee/actions";
import { Chip, IconButton, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import DeleteEmployee from "./DeleteEmployee";
const useStyles = makeStyles((theme) => ({
    chip: { marginRight: theme.spacing(1) },
  }));
export default function ListEmployees(props) {
    const classes = useStyles();
    const { EmployeesData, status } = useSelector((state) => state.Employees);
    const { content: employees, totalPages, number: page } = EmployeesData;
    const dispatch = useDispatch();
    const [filter, setFilter] = useState({});
    const [openAddEdit, setOpenAddEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selected, setSelected] = useState();
    const handleGetEmployees = useCallback(
        (nPage, nFilter) => {
            dispatch(getListEmployees(nPage, nFilter));
        },
        [dispatch]
    );
    const handleOpenAddEdit = (employee) => (event) => {
        setSelected(employee);
        setOpenAddEdit(true);
    };
    const handleCloseAddEdit = useCallback(() => {
        setSelected(null);
        setOpenAddEdit(false);
    }, []);
    const handleOpenDelete = (employee) => (event) => {
        setSelected(employee);
        setOpenDelete(true);
    };
    const handleCloseDelete = useCallback(() => {
        setSelected(null);
        setOpenDelete(false);
    }, []);
    useEffect(() => {
        handleGetEmployees(0, filter);
    }, [handleGetEmployees, filter]);
    return (
        <>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Gestion Employee</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                                <li className="breadcrumb-item active">Employee</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-primary card-outline">
                                <div className="card-header">
                                    <h3 className="card-title">Bordered Table</h3>
                                </div>
                                <div className="card-body" style={{ textAlign: "right", paddingBottom: "0" }}>
                                    <button type="button" onClick={handleOpenAddEdit(null)} className="btn btn-info">Add</button>
                                </div>
                                <div className="card-body">
                                    <table className="table table-bordered table-striped">
                                        <thead style={{textAlign: "center"}}>
                                            <tr>
                                                <th style={{ width: '10px' }}>#</th>
                                                <th>Nom</th>
                                                <th>Prenom</th>
                                                <th>Date Debut</th>
                                                <th>cin</th>
                                                <th>dateNaissace</th>
                                                <th>email</th>
                                                <th>Telephone</th>
                                                <th>adresse</th>
                                                <th>nationalite</th>
                                                <th>codePostale</th>
                                                <th>salaire</th>
                                                <th>department</th>
                                                <th>poste</th>
                                                <th>contrat</th>
                                                
                                                <th style={{ width: '100px' }}></th>
                                            </tr>
                                        </thead>
                                        <tbody style={{textAlign: "center"}}>
                                            {employees.map((employee, idx) => (
                                                <tr>
                                                    <td>{employee.id}</td>
                                                    <td>{employee.nameEmployee}</td>
                                                    <td>{employee.lastNameEmployee}</td>
                                                    <td>{employee.dateDebutEmployee}</td>
                                                    <td>{employee.cinemployee}</td>
                                                    <td>{employee.dateNaissaceEmployee}</td>
                                                    <td>{employee.emailEmployee}</td>
                                                    <td>{employee.telephoneEmployee}</td>
                                                    <td>{employee.adresseEmployee}</td>
                                                    <td>{employee.nationaliteEmployee}</td>
                                                    <td>{employee.codePostaleEmployee}</td>
                                                    <td>{employee.salaireEmployee}</td>
                                                    <td>{employee.departementEmployee}</td>
                                                    <td>{employee.posteEmployee}</td>
                                                    <td>{employee.contratEmployee}</td>
                                                    <td>
                                                        {employee.employees.length === 0 ? (
                                                            "Pas de Participant"
                                                        ) : (
                                                            employee.employees.map((value) => (
                                                                <Chip
                                                                    variant="outlined"
                                                                    label={value.nom}
                                                                    className={classes.chip}
                                                                />
                                                            ))
                                                        )}
                                                    </td>
                                                    <td className="project-actions text-right" style={{ width: '100px' }}>
                                                        <a className="btn btn-info btn-sm" style={{marginRight: "10px"}} onClick={handleOpenAddEdit(employee)}>
                                                            <i className="fas fa-pencil-alt">
                                                            </i> </a>
                                                        <a className="btn btn-danger btn-sm" onClick={handleOpenDelete(employee)}>
                                                            <i className="fas fa-trash">
                                                            </i> </a>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="card-footer clearfix">
                                    <ul className="pagination pagination-sm m-0 float-right">
                                        <li className="page-item"><a className="page-link" href="#">&laquo;</a></li>
                                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                        <li className="page-item"><a className="page-link" href="#">&raquo;</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <AddEditEmployee
                open={openAddEdit}
                handleClose={handleCloseAddEdit}
                selected={selected}
            />
            <DeleteEmployee
                open={openDelete}
                handleClose={handleCloseDelete}
                selected={selected}
            />
        </>
    )
}