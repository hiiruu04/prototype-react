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
                      <TableCell>Priority</TableCell>
                      <TableCell>Occurence</TableCell>  
                      <TableCell>First Occurence</TableCell>
                      <TableCell>Last Occurence</TableCell>
                      <TableCell>Recommendation</TableCell>
                  </TableRow>
                  </TableHead>
                  <TableBody>
                  {
                    datas.length?
                      datas.map((data,index)=>{
                        return(
                          <TableRow>
                            <TableCell>{index+1}</TableCell>
                            <TableCell>
                              {
                                data.priority===5 ?
                                data.priority + " (Lowest)"
                                :
                                data.priority===4 ?
                                data.priority + " (Low)"
                                :
                                data.priority===3 ?
                                data.priority + " (Medium)"
                                :
                                data.priority===2 ?
                                data.priority + " (High)"
                                :
                                data.priority + " (Highest)"
                              }
                            </TableCell>
                            <TableCell>
                              {data.occurence}
                            </TableCell>
                            <TableCell>
                              {data.first}
                            </TableCell>
                            <TableCell>
                              {data.last}
                            </TableCell>
                            <TableCell>
                              <a href={data.recomendation}>Unduh file rekomendasi</a>
                            </TableCell>
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