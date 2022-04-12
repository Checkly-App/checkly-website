// import { Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// const FilterByDateRange = () => {   /* function for adding 2 textfields for date range */
//     return (
//         <>
//             <Grid alignItems="center" container justify="center">
//                 <Grid item xs={12} sm={6} md={4} lg={4}>
//                     <Paper
//                         elevation={3}
//                         style={{
//                             margin: "10px auto",
//                             textAlign: "center",
//                             padding: "10px",
//                         }}>
//                         <Typography> Search by Date Range </Typography>
//                         <TextField
//                             value={Date1}
//                             onChange={(e) => setDate1(e.target.value)}
//                             type="date"
//                             id="date"
//                             label='Start Date'
//                             InputLabelProps={{
//                                 shrink: true,
//                             }}
//                             style={{ margin: "10px" }} />
//                         <TextField
//                             value={Date2}
//                             label='End Date'
//                             onChange={(e) => setDate2(e.target.value)}
//                             type="date"
//                             id="date"
//                             InputLabelProps={{
//                                 shrink: true,
//                             }}
//                             style={{ margin: "10px" }}
//                         />
//                         <div>
//                             <Button
//                                 onClick={() => {
//                                     setDate1("");
//                                     setDate2("");
//                                 }}
//                                 variant="contained"
//                                 color="primary">
//                                 Clear
//                             </Button>
//                         </div>
//                     </Paper>
//                 </Grid>
//             </Grid>
//         </>
//     );
// };


// const myData = () => {  /* function to determine the data to be rendered to the table */
//     let myArr = [];
//     if (Date1 && Date2) {
//         data.map((item) =>
//             item.date >= Date1 && item.date <= Date2 ? myArr?.push(item) : null
//         );
//     } else {
//         myArr = data;  /* YourData is the array you want to display and filter */
//     }

//     return myArr;
// };