import React, { useEffect, useState, useCallback } from "react";
import {
  Dialog,
  Button,
  FormControl,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Input,
  InputLabel,
  Select,
  Chip,
  MenuItem,
  makeStyles,
} from "@material-ui/core/";
import { addEditEmployee } from "../../../stores/reducers/employee/actions";
import { getListEmployees } from "../../../stores/reducers/employee/actions";
import { useDispatch, useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

export default ({ open, handleClose, selected }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { EmployeesData } = useSelector((state) => state.employees);
  const { content: listemployee } = EmployeesData;
  useEffect(() => {
    setNameEmployee(selected ? selected.nom : null);
   {/* setcinEmployee(selected ? selected.cinEmployee : null); */}
    dispatch(getListEmployees(0, {}));
  }, [dispatch,selected]);
  const [employee, setEmployee] = useState();
  const [nameEmployee, setNameEmployee] = useState();
  const [lastNameEmployee, setLastNameEmployee] = useState();
  const [cinEmployee, setcinEmployee] = useState();
  const [dateNaissaceEmployee, setdateNaissaceEmployee] = useState();
  const [emailEmployee, setEmailEmployee] = useState();
  const [telephoneEmployee, setTelephoneEmployee] = useState();
  const [adresseEmployee, setAdresseEmployee] = useState();
  const [nationaliteEmployee, setNationaliteEmployee] = useState();
  const [codePostaleEmployee, setCodePostaleEmployee] = useState();
  const [salaireEmployee, setSalaireEmployee] = useState();
  const [dateDebutEmployee, setdateDebutEmployee] = useState();
  const [departementEmployee, setDepartementEmployee] = useState();
  const [posteEmployee, setPosteEmployee] = useState();
  const [contratEmployee, setContratEmployee] = useState();
  const handleChange = (event) => {
    setEmployee(event.target.value);
  };
  const addEditEmployeeCallback = useCallback(() => {
    dispatch(
      addEditEmployee(
        {
            id: selected ? selected.id : undefined,
            nom: nameEmployee,
            telephone: telephoneEmployee,
            adresse: adresseEmployee,
            cin: cinEmployee,
            code_postale: codePostaleEmployee,
            date_debut: dateDebutEmployee,
            date_naissace: dateNaissaceEmployee,
            email: emailEmployee,
            nationalite: nationaliteEmployee,
            prenom: lastNameEmployee,
            salaire: salaireEmployee,
            id_contrat: contratEmployee,
            id_department: departementEmployee,
            id_poste: posteEmployee,
        },
        handleClose
      )
    );
  }, [dispatch, nameEmployee, selected, telephoneEmployee, adresseEmployee, cinEmployee, codePostaleEmployee, dateDebutEmployee, dateNaissaceEmployee, 
    emailEmployee, nationaliteEmployee, lastNameEmployee, salaireEmployee, contratEmployee, departementEmployee, posteEmployee]);
  function submitForm() {
    addEditEmployeeCallback();
  }
  return (
    <Dialog
      maxWidth="xs"
      fullWidth={true}
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      aria-describedby="form-dialog-description"
    >
      <form className="modal-content">
        <DialogTitle id="form-dialog-title">
          {selected ? (
            "EDIT Employee"
          ) : (
            "ADD Employee"
          )}
        </DialogTitle>
        <DialogContent className="modal-body">
          <TextField
            error={nameEmployee === ""}
            helperText={nameEmployee === "" ? "Empty!" : " "}
            id="nameProfil"
            variant="outlined"
            value={nameEmployee}
            fullWidth
            label="Name Employee"
            onChange={(e) => setNameEmployee(e.target.value)}
          />
          <TextField
            error={dateDebutEmployee === ""}
            helperText={dateDebutEmployee === "" ? "Empty!" : " "}
            id="dateDebutEmployee"
            variant="outlined"
            value={dateDebutEmployee}
            label="Date Debut"
            type="date"
            fullWidth
            onChange={(e) => setdateDebutEmployee(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
         {/* 
          <TextField
            error={dateFin === ""}
            helperText={dateFin === "" ? "Empty!" : " "}
            id="dateFin"
            variant="outlined"
            value={dateFin}
            label="Date Fin"
            type="date"
            fullWidth
            onChange={(e) => setDateFin(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          /> */}
          <TextField
            error={cinEmployee === ""}
            helperText={cinEmployee === "" ? "Empty!" : " "}
            id="cinEmployee"
            multiline
            rows={2}
            rowsMax={4}
            variant="outlined"
            value={cinEmployee}
            fullWidth
            label="cinEmployee"
            onChange={(e) => setcinEmployee(e.target.value)}
          />
         {/* 
          <FormControl fullWidth>
            <InputLabel id="demo-mutiple-chip-label">Employee</InputLabel>
            <Select
              name={"permissions"}
              id="listP"
              multiple
              variant="outlined"
              value={employees}
              onChange={handleChange}
              input={<Input id="select-multiple-chip" />}
              renderValue={(selected) => (
                <div className={classes.chips}>
                  {selected.map((value) => (
                    <Chip
                      key={value.id}
                      label={value.nom}
                      className={classes.chip}
                    />
                  ))}
                </div>
              )}
            >
            
              {listemployee.length > 0
                ? listemployee.map((v, i) => (
                  <MenuItem
                    key={v.id}
                    value={v}
                    style={{
                      fontWeight:
                        employees.map((p) => p.id).indexOf(v.id) === -1
                          ? 500
                          : 700,
                    }}
                  >
                    {v.nom} {v.prenom}
                  </MenuItem>
                ))
                : ""}
            </Select>
          </FormControl>
          */ }
        </DialogContent>
        <br />
        <DialogActions className="modal-footer">
          <Button onClick={submitForm} variant="outlined" color="primary">
            Save
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
