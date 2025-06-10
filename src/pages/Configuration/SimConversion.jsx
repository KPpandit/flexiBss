"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material"
import {
  PhoneAndroid as PhoneIcon,
  SwapHoriz as SwapIcon,
  Security as SecurityIcon,
  Undo as UndoIcon,
  Close as CloseIcon,
} from "@mui/icons-material"
import PhysicalToEsimForm from "./PhysicalToEsimForm"
import PrepaidToPostpaidForm from "./PrepaidToPostpaidForm"
import PostpaidToPrepaidForm from "./PostpaidToPrepaidForm"
import SimStolenForm from "./SimStolenForm"
import SimReturnForm from "./SimReturnForm"

const conversionTypes = [
  {
    id: "physical-to-esim",
    title: "Physical ↔ eSIM",
    description: "Convert physical SIM card to eSIM",
    icon: <PhoneIcon />,
    color: "primary",
  },
  {
    id: "prepaid-to-postpaid",
    title: "Prepaid to Postpaid",
    description: "Convert prepaid plan to postpaid",
    icon: <SwapIcon />,
    color: "secondary",
  },
  {
    id: "postpaid-to-prepaid",
    title: "Postpaid to Prepaid",
    description: "Convert postpaid plan to prepaid",
    icon: <SwapIcon sx={{ transform: "rotate(180deg)" }} />,
    color: "secondary",
  },
  {
    id: "sim-stolen",
    title: "SIM Stolen",
    description: "Report and block stolen SIM card",
    icon: <SecurityIcon />,
    color: "error",
  },
  {
    id: "sim-return",
    title: "SIM Return",
    description: "Process SIM card return",
    icon: <UndoIcon />,
    color: "warning",
  },
]

export default function SimConversion() {
  const [openDialog, setOpenDialog] = useState(null)

  const handleOpenDialog = (conversionType) => {
    setOpenDialog(conversionType)
  }

  const handleCloseDialog = () => {
    setOpenDialog(null)
  }

  const renderForm = () => {
    switch (openDialog) {
      case "physical-to-esim":
        return <PhysicalToEsimForm onClose={handleCloseDialog} />
      case "prepaid-to-postpaid":
        return <PrepaidToPostpaidForm onClose={handleCloseDialog} />
      case "postpaid-to-prepaid":
        return <PostpaidToPrepaidForm onClose={handleCloseDialog} />
      case "sim-stolen":
        return <SimStolenForm onClose={handleCloseDialog} />
      case "sim-return":
        return <SimReturnForm onClose={handleCloseDialog} />
      default:
        return null
    }
  }

  const getDialogTitle = () => {
    const type = conversionTypes.find((t) => t.id === openDialog)
    return type ? type.title : ""
  }

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom>
        SIM Conversion Services
      </Typography>

      <Typography variant="body1" color="textSecondary" paragraph>
        Select the type of SIM conversion or service you need to perform:
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {conversionTypes.map((type) => (
          <Grid item xs={12} sm={6} md={4} key={type.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 4,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: "center", p: 3 }}>
                <Box
                  sx={{
                    color: `${type.color}.main`,
                    mb: 2,
                    "& svg": { fontSize: 48 },
                  }}
                >
                  {type.icon}
                </Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  {type.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {type.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                <Button
                  variant="contained"
                  color={type.color}
                  onClick={() => handleOpenDialog(type.id)}
                  fullWidth
                  sx={{ mx: 2 }}
                >
                  Start Process
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog for forms */}
      <Dialog
        open={!!openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { minHeight: "400px" },
        }}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6">{getDialogTitle()}</Typography>
          <IconButton onClick={handleCloseDialog}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>{renderForm()}</DialogContent>
      </Dialog>
    </Box>
  )
}
