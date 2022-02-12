import { Grid, Table, TableContainer, TableCell, TableRow, TableHead, TableBody, Paper } from "@material-ui/core";
import "./recomendation.css";
  

const Recomendation=({datas}) => {
    return (
      <div className="recomendation">
          <Grid xs={8}>
            <TableContainer component={Paper}>
              <Table size="small" aria-label="simple table">
                  <TableHead>
                  <TableRow>
                      <TableCell>No</TableCell>
                      <TableCell>Severity</TableCell>
                      <TableCell>Recomendation</TableCell>
                  </TableRow>
                  </TableHead>
                  <TableBody>
                  {
                    datas.length?
                      datas.map((data)=>{
                        return(
                          <TableRow>
                            <TableCell>{data.index}</TableCell>
                            <TableCell>{data.priority}</TableCell>
                            <TableCell>{data.recomendation}</TableCell>
                          </TableRow>
                        )
                      })
                    :
                    <TableRow>
                      <TableCell colSpan={3} align='center'>No anomaly, so no recommendation</TableCell>
                    </TableRow>
                  }
              </TableBody>
            </Table>
          </TableContainer>  
        </Grid>
      </div>
    );
  }

export default Recomendation;