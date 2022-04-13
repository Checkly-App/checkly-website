import React from 'react';
import styled from 'styled-components';
import { Grid, IconButton } from '@mui/material';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Cell = styled.td`
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: flex-end;
    flex-direction: row;
`
const Caption = styled.h1`
    margin: 0;
    font-size: 0.75em;
    font-weight: 500;
    color: #A3A1A1;
`
const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: baseline;
`
const Square = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2em;
    width: 2em;
    font-size: 0.75em;
    font-weight: bolder;
    color: #35435E;
    background-color: rgba(123, 94, 255, 0.2);
    border-radius: 0.5em;
    margin: 0 1em;
`

const Pagination = (props) => {
    const { page, rowsPerPage, count, onPageChange } = props;
    let to = rowsPerPage * (page + 1);
    let total = count / rowsPerPage;
    if (to > count) { to = count; }
    return (
        <Cell>
            <Grid container alignItems="center" justify="flex-end" style={{ paddingTop: 8 }} >
                <Grid item>
                    <IconButton disabled={page === 0}
                        onClick={(e) => onPageChange(e, page - 1)} >
                        <FiChevronLeft size={20} color={page === 0 ? '#A3A1A1' : '#35435E'} />
                    </IconButton>
                </Grid>
                <Grid item>
                    <Container>
                        <Caption>Page </Caption>
                        <Square>
                            {page + 1}
                        </Square>
                        <Caption> of {total}</Caption>
                    </Container>
                </Grid>
                <Grid item>
                    <IconButton disabled={to >= count}
                        onClick={(e) => onPageChange(e, page + 1)} >
                        <FiChevronRight size={20} color={to < count ? '#35435E' : '#A3A1A1'} />
                    </IconButton>
                </Grid>
            </Grid>
        </Cell >
    );
};

export default Pagination;