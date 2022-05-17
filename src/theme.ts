import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
      mode: "dark",
    },
    components: {
      MuiTextField: {
        defaultProps: {
          margin: "dense",
          variant: "outlined",
        }
      },
			MuiListItemButton: {
				styleOverrides: {
					root: {
						"&.Mui-selected": {
							background: 'defaultTheme.palette.main.dark',
						}
					}
				}
			},
      MuiButton: {
        defaultProps: {
          size: "small",
          variant: "outlined",
        }
      },
      MuiSelect: {
        defaultProps: {
          MenuProps: {
            variant: "menu",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "center",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          },
        },
      },
    },
  });