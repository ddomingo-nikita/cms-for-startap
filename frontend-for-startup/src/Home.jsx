import {Box , Button , Container , Typography , useMediaQuery , useTheme} from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export const Home = () => {
    const { t } = useTranslation();
    const theme = useTheme()
    const isSm = useMediaQuery(theme.breakpoints.down("sm"))
    return (
        <Container maxWidth={"lg"} style={{display:isSm ? "block" :"flex", alignItems: "center", flexDirection:"column", justifyContent: "center", height: "90vh"}}>
            <Typography variant="h2" component="h2" gutterBottom style={{overflowWrap: "break-word", textAlign: isSm ? "center" :"start"}}>
                {t('home.title')}
            </Typography>
            <Box display={"flex"} justifyContent={"space-evenly"} width="100%" maxWidth={isSm ? "100%" :300}>
                <Button variant={"outlined"} component={Link} to="/signup">
                    {t('home.signUp')}
                </Button>
                <Button variant={"contained"} component={Link} to="/signin">
                    {t('home.signIn')}
                </Button>
            </Box>
        </Container>
    )
}
