# API Document

## USER

GET: `/api/user?uid=[user_id]`
 - Load user data
 - response
    ```
    {
        "user_id": "",
        "user_idx": 0, // Use to get rank data
        "user_name": "",
    }
    ```


POST: `/api/user`
 - Add user (Create user account)
 - Check each user_id and user_name is unique
 - body
    ```
    {
        "user_id": "",
        "user_name": "",
        "user_password": "",
    }
    ```
 - response
   - success: `200` / error: `400`


PATCH: `/api/user`
 - Modify user data
 - body
    ```
    {
        "user_name": "",
        "user_password": "",
    }
    ```
 - response
   - success: `200` / error: `400`


DELETE: `/api/user?uid=[user_id]`
 - Delete User Data
 - No plan to make this API

___

## DATA

GET: `/api/data`
 - Give all data of rank table
 - response
    ```
    [
        {
            "user_id": "",
            "stage_id": 0,
            "elapsed_time": 0,
        },
        ...
    ]
    ```

POST: `/api/data`
 - Add user record data
 - body
    ```
    {
        "user_idx": 0,
        "stage_id": 0,
        "elapsed_time": 0,
    }
    ```

PATCH: `TBD`
 - No plan to make this API
 - Rank data is permanently stored on the server

DELETE: `TBD`
 - No plan to make this API
 - Rank data is permanently stored on the server

