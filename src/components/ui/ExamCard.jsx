import * as React from 'react';

import { Card, 
         CardActions, 
         CardContent, 
         CardMedia, 
         Button, 
         Typography, 
         Box, 
         Chip, 
         Stack } from '@mui/material';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Instructions from 'components/dialog/Instructions';

import { ExamStatus } from 'utils/Enums';

function ExamCard(props) {
    const {
        exam
    } = props;

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getColor = (status) => {
        switch (status) {
            case ExamStatus.IN_PROGRESS:
                return 'primary';
            case ExamStatus.COMPLETED:
                return 'success';
            case ExamStatus.PENDING:
                return 'error';
            default:
                return 'secondary';
        }
    }

    return (
        <Box>
            <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASAAAACvCAMAAABqzPMLAAACH1BMVEWHqcESGi7U8f81aY3///8XUXqXs8cAy//W9v9Xk86LrMQALlXW8/8AyP8AzP+LrcQAAADU7P85tOctZImCpL2tyuDc+f//6ADB2/DX9f8AABhBt+gAz/8tUok0WIz/yxAZkMAAAB8AABSL0fKp3vd9pcn/hjcVmcoehbT/1Avp+v8AABcAAAppxO0UodIajbwAeq0AW5D/wa604/l7y/D/qyL/pCbD6vxKeJkAZ5fn9/9wlrH/3gD/vQD/oShyx+4ARW//mC0ARHAAADn/uBsAW4hahaOc5/9GdZZVjK6z0uRpjbCRpbPF4O6gtsQSHjNsstITKUI0Pk9n2f+y1vEAGUp3hpcAIk1ggqZLcpoAAC8AEy7/kjD/gShRpcql6P8AOWL/nQD/wZ8pRmiXvNxIU2KKw9sAHDxfbHo7RVU1WoOBg4rf4OK/wMQTLUeCkqNESmShx+YAN2IbgJIiwtcQQ1VgY22ur7TG0tvczNbv0M3WvcDvnZD/8+9GaZcnKzuNrrH00qPIzIT/4EaZaihMNSDZ483/9qD/zL/99ruv1qjAgyT/4OO50Xo+Mi3flyNwUCr/9Jf/89W14OPV2aPh1lF0wMOIwKrqy4n/z07rs0D/0nDh38vIuICrtZr/qEqmuZ49d7f/mlS5n63/oG/pxK3/dwDRcjuBX1txotXk2EnQwmvmu0z4uGH/5sj/zYz/uXn/xp7RlXr/n2imd2iQdFwJAAAYcklEQVR4nO2di3ca95XH0TA8jAYGhmEsBLEeIEsmQi+wkYRlKeiNhUSCEXZkGdl6VHbsulF3E9eJ7abtbpRud7v1NrtJk6aN1+lz+0jSP3Dv/c0wzADxOEczAp8z35zIBmHEfHTv9z4GjSx2i6lnygSkIROQhkxAGjIBacgEpCETkIZMQBoyAWnIBKQhE5CGTEAaMgFpyASkIROQhkxAGjIBacgEpCETkIZMQBoyAWnIBKQhE5CGTEAaMgFpyASkIROQhkxAGmpFQC5Xs1+BQq0HiOeXly2tg6j1AHUwVHp0uWUItRogPhtkgrHcwESabfZLEdVygCiGygadscDECN8SUdRqgFgnte19tCo4J9nRlrCiVgMUEHYG29oGd3OCMLncClbUYoD4rHCxs62tbcO7Tgmx3EjzrajVAOWctxBQW1tPz4rQClbUaoCYVHubpN5HAcgzC+RZMxG1GCC78GZPmyzvW2BFDFhRE/OstQDxAaGvtwqorWcQrSg70UQrahagNN/okPkO4Upnm1I9G1DyY/bRcUuTEDUHUD6JeVNvLdAmZtpq1PtaFqyIb5YVNQeQx1PYa5Q3Luel79QCAivaz0HJX25OnjUJkMPhKbCjE7V5ZidtIupm74Yiz3rvwvQBVtSEkt8UQHkA5HCEI2mwFuUhV9rEtraXAx27g4og6myrWNFxI2oKoDgBhIjGVVbE5wSpTdyANnH1kdKvB2+iFR3/IqQpgBwSIIdDbUXVNvHmG15oE+8qeiKYPvZx+hg/ZitqDqCqPAXLqLViRXbhkohkY5e+fdO7H3i5rW1NYUWdK85jnz6aAsijIAR5tgDWQlRtE3vW7tB3esCF1mzbCkSdj1Yhz451EdIMQMSjC1VEhT3/PN4PHn1Ztp3B3dv07kbbd20227bSio57EdIMQMSj6aDbLefZXiZtIW3ijNJz3rjZRgDZbFvKu493EdIMQCEA5I7R7nK4QiiS4fETwQ6pTVwjXRD60bZN1HcVViQuQkZHGk4reqsZgCTvCctBBBGExwqjvGhBPXc7bkpdkE3Wq1VE4iKEbzit6K1mAJI82p1KhWliRR6LjVW2iW1rdmF1rVMNSOXWXrQiannU+DxrSgRVCLkLEEQYTOtWVtkm4oQKXRCk2as2pRRuLS9CjM6zJnXSFUSLJIIK2wsIiEopzNi773tU8eiqlFbUtkKmjyVjFyFN2gfJhESPLmIRY4VLigEVvFjh0TONEImLEJw+DETUrIVZvjpugEcX0WwDwo5ym0hUAZPONHRrXIQIuaX5tHFm3byVaxVRmN8SPfpyTy0giclSTEFIEUNgRXeZYIwXuwRD1MyddEhKtPC634UWFNyu5bMmJVhaEKqE1lQP6VzLUTHbkmEh1NylvUio8L0FPL5gR3stIMmjZ1jBKaQr6VbzmJ59QVixEUBGUGryWQ2SZ4VZbGegTeysBbRtq9dM7YMGqeDqDLLhlw1oi5p+2ifuCeetLmJBfXWA1hoQqstDb865AjnKByjLqP6bkCYAYl34X/VA8qRKQ5t4pQ5QbadY69FijgVj49BH8Qwj5JZ134QcPyA2PW6dn3fVfmGe8m3V82mr7xXXaj6/sSvEDqCPYoMUxcSyIzqfhz12QOmDg4xtfn659v6aNlGMDfGjOs/qHnRXyBXhCQIMBQrG7Pqehz1eQLw9JwQOZmzz1uoeGmVp2Cb27COite+rzLrOgnpXhdUZyLAsAQSIGF5PKzpOQDybCzKUYIEIku+yd/h8vqxqlK8eeoBZH+x59Z/++TWFFdVZkDcn3AWX53MSIIrS1YqODxBvyQbxGBjqYF5qfO12H+UjQo+uA9TmXac6dr09XvqO11uxoldrH/RIiG1DH8VTVYEVTei1lD02QHyAEb/FTNBfvcsnKcvnnDs1gDbeuv3Ii6fHBt+6uZ7tlayozoL2hclZXvRoBaJJ++iELvPHMQGCJkXKAIayV+/0yeIDQerWoPrYH92j3/auBYS73t791c7vi11RLaDOFeFekZU8elJOM7Ci5VE9XvmxAOLtVLASPlnF/QpAATbHpC5vKINoY9e7e5t+w7vb4dv3DoIVYVdU59GDWWFlu+LRNK0IotxoWofXfgyARG+uhI8q7sGC7v3gB5Tvvi8owGeFS7cUhHo7fLveN+jbu971oLyjrlMnI+wvVTw6RlP0ZAUQ9ZIeOWY8IDYr42GyvIVlFU0K+8677747dv/wgS8aRYtimJ1Mtdj3rAiBNe/b9J22XrCitgZ9ttgmltJVj2YgiMQvF8xm9GiHjAbEL9tj0ksP5lie5a88vKx43W+PET1ITHOhBB5YkOprl0m8/GhVWPE+ug1W9FpWuNvbUw+oZ13IzeLXqbjP5CQjBlHQ5W95QKzL7rs0YY2JER/gWcvll069pIj8vh++97NDABTnpqPJFIPfe0bouLKhOL/aQa1736JvD3r3fWBFdYBeXhXuiOu2SpySIMJuaGFcj0JvICCXZXxEAP/NrMREc2Yvnjp16qWH1fMQfT86efLH98fefSfEhSDHklxERPTmrZflFPKuMx03vW+9/pN/6b0rBF6r82hoE/1k12GnZELkLzHbQmsDYpdHR/eg0aHspVgQzJlNn4LwOaV4s8vOv548efL9w3fHDj/4aYQDRhEuTo4uGNzZkq0IT6SCAf1k7t86X1/dr82yNSH2vQXxKeVOS/LoYkv3QWzan1kGR8ESPjsJ2cU/fAnC57Js0VDbhC4A9AF60M9O/jsAikQSCcmKnKmL35HzjJwk6/mPn8/9pLN2nq20ieJTWqp5Bh5d0qWVNgaQy7KUsWYFfLU+X8ct+CKXEc8VObvwWII/RkAnH6BJnzz/00g0xIEVhbiUmGeXrvTIiLz72c6N1//z7M9frwFUaRMrT2uXO4rgik2XmV5vQC4WrNm1kMnYBak19EFhv4jZ9VCRXdBYM+93EUC/oB9/cP78+TNxBBSJRKiQZEXON21ynm2gKQGi2gjqFdvEquSWHbqjVgTEprdLtgXbQZoKSn4J2ZV+iOZzsYoHG2vmv85IgB4jnjNnfjmdJEGEVhRNECuCkq9egdRtjHopYb0GBPTUpGfcWmhBQPytom1h6WApJ4YPtD7Qwl0h5iOvH0hjzUS5D89MTQGf848fn0F1fcxxXDTJcUko+EkunsJnEJRW1Eg3hVh77VlD3tUBeca8rs+5Ml0BsVvtC+C9QSm7SO2qNR/8BjOpEPff57um5k5C8NAPgA4qz0Wj8UgiDqCSiVBSRCxcelhTuHoUt6FNnJytfx24l1vVpcjrC4hdKCr7NewMG5kPfi7K/c+ZrjkE9D5Nd3XNdXVNTf0WsIU4tKJ4dDoqzyfOnW3Vz7esr3vlTMM2sb3hD33Y9dop6gnItVSs4sHOkJfMRw4fucgwVOKjqXNz4D0PENDZKdBH0UgcYieeTEQAVChV6WrQil6uAtqnqu8xl9tE46QnILulXZDnLnhiyXxkPMQbKnIefnl16syZj2ma/njqwtTc3NyvOC5O2HBRmMyiSdGGSEXqUCxCSOP4SLohxHZ1SqVvPijdxDoFeasRkMxHMVdI1UXW2NhhF1gzAPpk6hXgc/YsAIpGkoRNJAFOxEXkPFMtQvAdeMSINrBN1GPp8wzpCGhH+DQolvaspX6uqI5K0tQ9NnYfnHnqAf14bu4q4Dl7fQ+LWAjZQCsEVhSJhKLVlFVa0eAusSGIpXuzL8o7zPi+X0+d/VTcalgazBVBNR+MoE/Rmt+jIXpOA59z1/eS4kQWicOHUJJ4digoW5FPsQiRQikrrG6/IID6PoOjnXuPITtDYj5XLMq5ohYPAnoPnHnuV59A9Fw4d+7cbz7LR6FVBEbQBBE2qTgGktKKrqh2sm2D9W2i7tIJUN+HUJC6PhUYubQrzEc1ZVOVkxtjY5+gNWNynT1743DscJGwiYRwagUrQjaJJHp2Slw2iosQJaHXhNi2gW8uI9ILELTEfwajcVlwrjilmCvgS6hPyHSkyG3n2NivJDznzl2/MTb2TgiqPOSWNHCI9SwRCU1H42hFEdIZqRch64pR3ijpBIj/7Yc/7MM/xdKuelelnVYF0InPd/BQnYdjFTwXLrwCE/07WMQSISxe4NWR6DRhw0meDekWStUsQjpXhXsN20Q9pZcH8YiHvaieK4hcy2k6pgR04sTnAYFhDsckPK+88gR3QnkuFOKSESxeZOCAGynCJgERlIQRDfJOvQjBNvHWiwKICAAp5woiV757dGJVPhlDAJ34/EROuD8m4bmKfG58AYkVQv+RB44kTGbTMHVInh2nIlJnVFmE9BjfJuo9zUNdr8HD9/cPDUyMTtyr5BkBBIj67o9dJ3iufg18vv7dF04GizwigoEjGkriiQ4uRGEoxVNJXIKQDiCKDkYWIYP7QszoNtHw0z7XuvuBUP/IxOjyJK0EBIj+9zfXAc/m08PDG6dPb37hhPwBJoBoOkWKFxCC+IkDE2Qj3gWmFGfERUh6nQremzX8p1kMBcQPD3d3E0TdExOjFmJFMiDQF1c3gc/Y15siIGgy0YvRipLAJh6PRnHgIB+hqsVJdx2NxkUrcjoZ59uGW5ChgFzDAwOICAlBnk1MBMCKlIBc9NMbGD6nJUDY7UhWRFUGDmyqofSDeeO+GssbZCJZ7EMkLRn46iUZCmgAVUGEeTZyjw4qAPEPwJ1/JwEKVvrICG4VQ/GIWLxIJUObRjZJrHLxKKn3zGLBHY4b+PJFGetByyMSoaoV0UpAh2P36b8+gQz7/R+EaiOQwiKPVZ4UL3HgmI4ko6KBh0LiPpZJuR0OjydvcKdosElnr6kQDYMV9f1RBtQ3SaPutJeKaadyGEkgGowYmDq4OGmKOHBu3MVGcCULnXWMHg87HG7PYtTYQzD22fmcEB0YQUIKKxrpkwExPh8SulIqqpchuNSfxqlMGsZgtk+EABYUMW46CSYt0G8X58MO92IsOTR0zchDMBqQUxD2RogVVfNsvvRQAkT5fJP0m5+3z9qdlFpMkNSuSBA6IlK8iBUBM8wvhr63PVscchRikSFU3sBDMByQ0yk48+o8K7W3b30uApqkO05kikW7QNWJScWnI1GGCSYq7SO2SHhP7Pb+bHGeCwtg4BwCMjKEDAXk4lOCExGlZCsCQrZ2UCmDJk1P/vGl0uxSrjZ+pCBCl04wkXgceyMSPhE0n7vF4tZQODWJlS1UMDjHjG0UB645RUJKK2oXVbp1om9ntFQsVU5SN0AEcAAPF4qL4RMFaPSdg2Jp2APmg01kgi47X1xA2CgO7FUQ7UlBRABtzePHUwel2QUq+A14RETAIZ5MBaMh0Xxu3yqWJtyFWNntBmcCg3/RAQGRqCAiosQ8654BNDM2MYq27zVwnxormo5M4xsYE5hd68WSjQs7Uw63myvEsAIWYi+ySS9jVg1fE53IKSSGMc+QzcwW4TNDpg8NQhg9IYJnpVja6g+XY2G32+2hSA8lFFJDnJGHYCwgF09spzsv5xlYEWbXDIZR+/AAmT6+yYIUVhShgvS9mVL7gGMxVgA87jLBQ08W6BD3AvdBFgvLI6Du7j0pz6DkT6AHkTAakhYhMQ1CFJqPtdQumQ9esUHUYhlLmaEHoB+gfD6EytcaAnsNi3v3UFTKs9RySTLpLfUi5BkC8ykdoPlQHrfDLZoPTSfEUqbbETSUToDyjnBhcXExCv8Xwg7VjO1KWwf6UZIVCdQssMEwau9XLEKeUcsm6dWDg0y/pwzZBdNXSsQTXBTK2F4b6dAWnQDFHYXo6votOIpMxp+2RwuOUOVTgMdvtVqHCaJpYkVCEdgQQIopf+AbrQjmCtvBwYB7keCpmA+9mMJS5g4963XpIT0AOcLR9WLGOr5MBMa7AIikbyyPeEBLhMRQBKxI2AY2+RKatGoREmuYZ/Tt8YODCY6Yj0M2n3JZIF5tcPhYdAHkKKwU/Wmivr48anmUL3jE156WAFkhz2Bq6h9KCMJSqb1EwkiePnARMj9qr7eiGM0fHMwPeShnGPCEBRGPUypl/ePGXw/v6IAc4fWttKxr1wiikXTBQT7LLsiErMNk9I4710vtRWGLAFItQvDch8qKBHo1k5npdqvNJ1YOYjQ5hiB5/QtHfv0aOjKgfDi/TdDw7E4gEHhzJ59HRgN5aR3K8uNVRP0E0TIC8kOfuFezcJwfHb9dtSIwH38mMwLZtYjmsyhlVyLFQClzhJbI0/qNu2qHqCMDioeX0ukFPtBRVYCkWbjin2x6qYLIP4CABkrts84F+CA41QvHbsgz+TRsbHLhIDMxFJ4EM66WdgrNx+FxDMvUW/3dHfHw8sW0Eg8qC2HkqRZ7VixllTzrny0WUysAiBHE6UNhRfPEimKAw5LJzPe7U6L5BKXGuQzRBHyG/NLz+a1Gnzk8MqA9z7V0BUs2KyPaCXkK1Qe5LAor6ufsb09ywwAoV5k+FFYEeTbB3ltN2zK2AS5KzMeRqtSuYBluhTkZN1hQy5+bzxfcJK2qEim5w9PKh7mqVuTnCs5FdzdGkLPBwrEf8mzUZrONDE2j+Thk8ymnghBNYfeA/ETHUMSODuhaMuzJBmrU0eHxLNb0cNU8C+OyYmhrdrxcmT5qrGhkYmKkP6Q2n1R5EqIpXDUfyK4X4kKT1/r3Cu5kDaCII7zoqGtyRUT+IY/DPTTMlX1BLqRehMh5BsoJxHyYivkIEE2e8JCcqIDnWK5VenRAQ0P5ctgxrcCTdHgWC25P/RRArMgfcrg5661QuFBwc1yyunBUuvWeaD6VuaLsTHncHrX5HNPVbo/uQfjtjpRhRPXEp6en4x6HB8ZWT4EMG+J1SxRy8Uv+kBt6mCWSZ6hFKYiqVjSc1zKfpeO7ovSRAfEkI7j4YnlRVHkRxwCfr8zybNbXwdYgYtPj3STPYFIYIIRCaisa6J50elSdD0ZT2NN/zOYj6ciA0n7kw3E4G5EL/4kXsC1Aqxe4FRB8VIdFjYh1VfIMmpl+giiuOvdBk7mCkuaKxYr5VLNLfV3JvoqOeiSNdfQI8lsRUMhdvTw0XvnPPWIP8sVZawfj8wVqgwisaAh8iETDEEFUqFpRYLG6UaXLFDGfULUXr/kVLX0//NGf8MfyTv7pz7/tM+J9DEcGxIKf5MUIkq+s6fFc8/vTdlz5FNM+hvLZaxHxSwPy9MGprCiVC8tLjUQiSEq70nxq8PzpfFU//syAKDr6NM/7/eOuvBxBHo8jlId6Ps6mceWz1X7ggvGzzopciumjmxDyJCqIpKUG08B81N7c99kZtf6sP6GjA3Kl/fjKXZZ8Ph6P5/OsiweTGWcJoK2Dra0DWyCIV5lSI1JNH0PuUEjOs1jFfMput9p8akv7Z11dXR/TH3RV9Wvds0yHhRlOEX7rQpq3uABTOo23yDcbAwg0kzkYb2hFiuljgCOIcOEoAiqnqFrzqbtydN//TU1NfULjj3zIakVAeKgLVr8fJ2z86F9KW9JoF+ltBJSZmZnJZHgf5FmdFSkWIcOYpJwbSj4ASpClhnKuWGpQ2vvwRz0AEP4w3icfvff4MfxlRY/jUUqnsxosy6cXxkELEEmsC24jMqt/BgIIZLNl5ncYKPm1R6lchPRjp8CFUzRD9vPhsHKp0agx7PvL2bNn/0I/eAAR9/iv7/0Nb+reQOp3XsyFl9d0yZfhl7b1/pkMAWSbz1izkxRV+/UUVgQlnyAqMGXHc80V/N/PXbhw7m9/+8uF66hz5y5c/3urRlADVbLHJvKZnx/N+Xy+jjqTcKmtyO2gn3upcfrLV9T68rTuh2EcILmQ+20iIBfj++X72QYuqsgz/7A7UXA/71Ljq80bX17d3LxKtLn59xunn+h+GIZeP6iSPX4SQD7fL0/+4oOGZUbRFfn3CqrS/sylxunN0zdu3Hj65MmTp/Dnk81N3TPM6LfgVbLHPz9vnfR9cv7kycZ1WGlFS8+91GAXfr+5uXn666c3nj49jX/b1/8YDH53RzV7ENDtuW/udXERYlVJe6nBjk+8gYhEPfmH36r/FsTwq+BB9kiEsgwVWHnGLKAs+c+31MAmfsL6xj+++uqrf/xhacLv1+eCLyoZf5lAOXv8WmdoyCJEzq7n+WUZrvFKc0q6VKsuL1it47gSJ2YPNtjaYwBLphY45Pq54hv+wYJfNixjTkMfz7VcXXhq+rn8AaYWaMeff6PKWtLjGEPWpW/xj76NjutqwM//22Vcrm/3K3nJ49lv+Y+eX03/rQitLhOQhkxAGjIBacgEpCETkIZMQBoyAWnIBKQhE5CGTEAaMgFpyASkIROQhkxAGjIBacgEpCETkIZMQBoyAWnIBKQhE5CGTEAaMgFpyASkIROQhkxAz9b/A4FRso/X9QrBAAAAAElFTkSuQmCC"
            />
            <CardContent>
                <Stack direction='row' justifyContent='space-between' alignItems='start'>
                    <Typography gutterBottom variant="h5" component="div">
                            {exam.name} 
                    </Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                    {exam.description}
                </Typography>
            </CardContent>
            <CardActions justifyContent='space-between'>
                <Button variant='contained' 
                    disabled={(exam.status === ExamStatus.COMPLETED || exam.status === ExamStatus.BLOCKED)}
                    size="small"
                    onClick={(e)=> handleClickOpen()}
                    startIcon={<PlayArrowIcon />}>
                        {(exam.status === ExamStatus.IN_PROGRESS) ? "Resume" : "Start"}
                    </Button>
                <Chip variant="outlined" color={getColor(exam.status)} size="small" sx={{height:1}} label={exam.status} />
            </CardActions>
            </Card>
            <Instructions open={open} exam={exam} handleClose={handleClose}/>
        </Box>
    )
}

export default ExamCard;