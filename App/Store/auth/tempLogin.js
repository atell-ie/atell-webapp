const auth = {
    data: {
        accessToken:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsifQ.eyJpc3MiOiJodHRwczovL2NoZWNrdmVudG9yeWFkYjJjcWEuYjJjbG9naW4uY29tLzExNDIzY2Y1LTAwMDEtNDJkOC1hZjM1LWNjNzBlNjAxYmNkYS92Mi4wLyIsImV4cCI6MTY2NzQzNzI1MCwibmJmIjoxNjY3NDEwMjUwLCJhdWQiOiI4NDIxZWViMS03M2M4LTQ1YzAtYmY5Mi0wNGFhNzRkMjdhMGUiLCJpZHAiOiJMb2NhbEFjY291bnQiLCJvaWQiOiI3N2M3MmRkOS02YmExLTRlZjMtYjExMy0zMmI4N2Y5ZDZmYTkiLCJzdWIiOiI3N2M3MmRkOS02YmExLTRlZjMtYjExMy0zMmI4N2Y5ZDZmYTkiLCJuYW1lIjoiQWxleCIsImVtYWlscyI6WyJhbGV4QGNoZWNrdmVudG9yeS5jb20iXSwidGZwIjoiQjJDXzFfUk9QQ19BdXRoIiwiYXpwIjoiODQyMWVlYjEtNzNjOC00NWMwLWJmOTItMDRhYTc0ZDI3YTBlIiwidmVyIjoiMS4wIiwiaWF0IjoxNjY3NDEwMjUwfQ.PlN8931jnEtVO6OgkzbmnIinsObWwaVd-lqTSIB-KOulENHP4NCwDRi8G2LJa-sKKF5MKO3yIJu_FBPylfB0QeALZtnY7ZRvqKgoLbZp3QrSM0nRRCB2_2WsiFSFTTJFK4X7tJrZQkhtUjAocNeIXnd1SAhcG00HhTOujOxfTD4pcyvC7IItmfOGSnnixRDtVuSfeyZkNQpVBjI_iS-zjIgE_KLqhQRzUZmYGHcelpYE9a-Qcj84A8mDU6wqqaAdCzunOk_QjimCiLPvUWQFwIP7ObK23JTXelY4yAj79HVaRjSfUAmJL81UQPIKdWVM8UrQO4VHad4-i1Sx5x5iKQ",
        expiresIn: "2000007000",
        idToken:
            "ewogICJ0eXAiOiAiSldUIiwKICAiYWxnIjogIlJTMjU2IiwKICAia2lkIjogIlg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsiCn0uewogICJleHAiOiAyNjY3NDM3MjUwLAogICJuYmYiOiAxNjY3NDEwMjUwLAogICJ2ZXIiOiAiMS4wIiwKICAiaXNzIjogImh0dHBzOi8vY2hlY2t2ZW50b3J5YWRiMmNxYS5iMmNsb2dpbi5jb20vMTE0MjNjZjUtMDAwMS00MmQ4LWFmMzUtY2M3MGU2MDFiY2RhL3YyLjAvIiwKICAic3ViIjogIjc3YzcyZGQ5LTZiYTEtNGVmMy1iMTEzLTMyYjg3ZjlkNmZhOSIsCiAgImF1ZCI6ICI4NDIxZWViMS03M2M4LTQ1YzAtYmY5Mi0wNGFhNzRkMjdhMGUiLAogICJpYXQiOiAxNjY3NDEwMjUwLAogICJhdXRoX3RpbWUiOiAxNjY3NDEwMjUwLAogICJpZHAiOiAiTG9jYWxBY2NvdW50IiwKICAib2lkIjogIjc3YzcyZGQ5LTZiYTEtNGVmMy1iMTEzLTMyYjg3ZjlkNmZhOSIsCiAgIm5hbWUiOiAiQWxleCIsCiAgImVtYWlscyI6IFsKICAgICJhbGV4QGNoZWNrdmVudG9yeS5jb20iCiAgXSwKICAidGZwIjogIkIyQ18xX1JPUENfQXV0aCIsCiAgImF0X2hhc2giOiAiVUktQlBIOFFCVm1fX3hjamR4VTZVUSIKfQ==eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsifQ.eyJleHAiOjE2Njc0MzcyNTAsIm5iZiI6MTY2NzQxMDI1MCwidmVyIjoiMS4wIiwiaXNzIjoiaHR0cHM6Ly9jaGVja3ZlbnRvcnlhZGIyY3FhLmIyY2xvZ2luLmNvbS8xMTQyM2NmNS0wMDAxLTQyZDgtYWYzNS1jYzcwZTYwMWJjZGEvdjIuMC8iLCJzdWIiOiI3N2M3MmRkOS02YmExLTRlZjMtYjExMy0zMmI4N2Y5ZDZmYTkiLCJhdWQiOiI4NDIxZWViMS03M2M4LTQ1YzAtYmY5Mi0wNGFhNzRkMjdhMGUiLCJpYXQiOjE2Njc0MTAyNTAsImF1dGhfdGltZSI6MTY2NzQxMDI1MCwiaWRwIjoiTG9jYWxBY2NvdW50Iiwib2lkIjoiNzdjNzJkZDktNmJhMS00ZWYzLWIxMTMtMzJiODdmOWQ2ZmE5IiwibmFtZSI6IkFsZXgiLCJlbWFpbHMiOlsiYWxleEBjaGVja3ZlbnRvcnkuY29tIl0sInRmcCI6IkIyQ18xX1JPUENfQXV0aCIsImF0X2hhc2giOiJVSS1CUEg4UUJWbV9feGNqZHhVNlVRIn0.ReGLgPJ0Ch9BPaBT2gc_XF6j31vdvpsL5s18NM1GkGgXCAX_A9xc2Eh9JeBHIwyYjstMtWOsGZJtlaMCULR0OPRMz1ei6mseQX6nKo_n66HwkXa61NrUEmtEtPu3xTz541SHCOZbQf9qtqD3JFww_XivvFWjbOAWbnclgjzrsNzrFhy6gP1wwxhQBQ3DH2Cniycp13REkK7w9g2PWHf-k0scF2WgbiGWqL3u1yLoB_tEU11Emv_bo0ZuzhvFkveBFU_Xzjxkh0WDeSHzjVnupi10hVuQnY1fTud9EVKb3Q7Yl8hIEL3qd8mVbHyXmf2Fo255PJ8FlgdVRHsTkyKSRA",
        refreshToken:
            "eyJraWQiOiJjcGltY29yZV8wOTI1MjAxNSIsInZlciI6IjEuMCIsInppcCI6IkRlZmxhdGUiLCJzZXIiOiIxLjAifQ..C6LrM_pBeTh7pzzt.3E-swPm9r_GZEC6sW4q3t0g36oT6NenY5Lm2-JkcrjnVXonNc437q6p-bOF5_4SUYLI94F19LJMbn4xh2f7vAX36vBO6JYtG4drFBoq1nMG1wT9ipF5gmwRZTV5QQzaOTr0VfXKHRjAoZe0lZb2hKnXzEEtO3xJlGnjdr8oweiJ9CTT_qUlNHRIrjPzridcAZ6t2Dhsb3q1q7kfX39_qUWjAdkYvMjn5J5wNYeNHazLnBZbc0dggm0u1ia3kaQerMKQrv-2VKXjVmS3WdQSyHdIyJKztYboarmVtYe-ISLn6diPHTXrHMvmdqQLuyWkn5e0yd58X8aj9UxN5K2PThcbUse1dD4a_kBVxGrRQPIr7dYT-Va4N10ZHUm7ltAwhwDI6zAv6RW307XNsGl6_27jO6QFgtzPAgFoLmfuIfxIIjBAJcvX2o1UfrsOwfymwynzVJSWR-3SyMx_FZK68sWl04nj55gnjKgyS695NStZ1dVAb9g2YPjGGJntjpOLolVH6P203vEeDdh5WlbtgOErWLE2O8LgINkQ-SYPu7ljGd3MeAE_B0nU1HqZMkg8HVKCl60gritvFqVqVetMIqIiqZeDNVJFU1ZWXyrBexcjGyEIvCPp1XleVg2NqwWn08gLNMbkes5Or1vzIAJFCQKeMLNCxaw.Ryquu50j1mx7JRAm8BKjVA",
        tokenType: "Bearer",
        account: {
            data: [
                {
                    id: 7,
                    firstName: "Alex",
                    surname: "Dolotovs",
                    displayName: "Alex",
                    lastLogin: "2022-11-02T14:10:42.780065Z",
                    email: "alex@checkventory.com",
                    groups: [
                        { id: 3, name: "Admin" },
                        { id: 3, name: "Admin" },
                        { id: 3, name: "Admin" },
                        { id: 1, name: "Auditor" },
                        { id: 2, name: "Controller" },
                        { id: 3, name: "Admin" },
                        { id: 3, name: "Admin" },
                        { id: 3, name: "Admin" },
                        { id: 1, name: "Auditor" },
                        { id: 2, name: "Controller" },
                        { id: 3, name: "Admin" }
                    ],
                    identityId: "77c72dd9-6ba1-4ef3-b113-32b87f9d6fa9",
                    avatarPath:
                        "https://cvauditorqa.blob.core.windows.net/audit-data/avatar-images/7/Alex2.jpeg?se=2022-11-03T01%3A30%3A50Z&sp=r&sv=2016-05-31&sr=c&sig=j%2BtAZCjhX5Y3ray6D42cgZcALpDgEbWcB1rRYIutuTw%3D",
                    avatarAltPath: null
                }
            ]
        },
        expiryDate: "2026-11-03T01:00:50.000Z",
        identityId: "77c72dd9-6ba1-4ef3-b113-32b87f9d6fa9",
        username: "alex@checkventory.com"
    }
};

export default auth;
