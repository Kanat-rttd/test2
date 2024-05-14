import React from 'react'
import { TableContainer, TableContainerProps, Spinner } from '@chakra-ui/react'
import classes from '../styles.module.css'

interface StyledTableContainerProps extends TableContainerProps {
    isLoading?: boolean
    children?: React.ReactNode
}

const StyledTableContainer: React.FC<StyledTableContainerProps> = ({
    children,
    isLoading,
    ...props
}) => {
    return (
        <TableContainer className={classes.tableContainer} {...props}>
            {isLoading ? (
                <div className={classes.spinnerOverlay}>
                    <Spinner size="lg" color="blue.500" />
                </div>
            ) : (
                children
            )}
        </TableContainer>
    )
}

export default StyledTableContainer
