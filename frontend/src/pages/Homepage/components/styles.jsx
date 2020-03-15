export const CareerStyles = theme => ({
  root: {
    minWidth: 275,
    maxWidth: "1rem",
    cursor: "pointer",
    textAlign: "center",
    borderRadius: "8px",
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 2px 10px 0 rgba(0,0,0,0.12)",
    },
  },
  title: {
    fontSize: 14,
  },
})

export const CareersStyles = theme => ({
  sectionHeading: {
    fontFamily: "Fredoka One",
    margin: theme.spacing(2),
    background: "linear-gradient(to right,#1414130f  36%, #FFF)",
    width: "54%",
    borderRadius: "7px",
    letterSpacing: "1px",
    padding: theme.spacing(1),
    color: "#d46e0c",
    textShadow: "2px 3px 2px #0000ff26",
  },
  space: {
    marginBottom: "6rem",
  },
})
