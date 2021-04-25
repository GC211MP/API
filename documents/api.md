# API Document

## USER

**GET: `/user?uid=[user_id]`**
 - Load user data
 - parameter
   - `uid`: (mandatory) user id to get data
 - response
    ```
    {
        "user_id": "",
        "user_idx": 0, // Use to get rank data
        "user_name": "",
    }
    ```

<br>

**POST: `/user`**
 - Add user (Create user account)
 - Check each user_id and user_name is unique
 - body
    ```
    {
        "user_id": "",         // mandatory
        "user_name": "",       // mandatory
        "user_password": "",   // mandatory
    }
    ```
 - response
   - success: `200` / error: `400`

<br>

**PATCH: `/user`**
 - Modify user data
 - body
    ```
    {
        "user_id": "",         // mandatory
        "user_name": "",
        "user_password": "",
    }
    ```
 - response
   - success: `200` / error: `400`

<br>

**DELETE: `/user?uid=[user_id]`**
 - Delete User Data
 - No plan to make this API

<br><br><br>

## DATA

**GET: `/data?c=""&o=""`**
 - Give all data of rank table
 - parameter
   - `c`: (mandatory) column to order
   - `o`: (mandatory) "desc" or "asc" (descending, ascending order)
 - response
    ```
    [
        {   
            "c_date": DateTime(),
            "user_name": "",
            "stage_id": 0,
            "elapsed_time": 0,
        },
        ...
    ]
    ```

<br>

**POST: `/data`**
 - Add user record data
 - body
    ```
    {
        "user_idx": 0,         // mandatory
        "stage_id": 0,         // mandatory
        "elapsed_time": 0,     // mandatory
    }
    ```

<br>

**PATCH: `TBD`**
 - No plan to make this API
 - Rank data is permanently stored on the server

<br>

**DELETE: `TBD`**
 - No plan to make this API
 - Rank data is permanently stored on the server
