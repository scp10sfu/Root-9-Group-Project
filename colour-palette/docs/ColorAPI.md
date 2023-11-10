

# The Color API Guide

The Color API is a simple API that allows you to get names and other information for colors based on HEX or RGB values.

## Getting Started

You do not need an API key for basic requests. You can simply make HTTP GET requests to the API endpoints with your color values.

## Endpoints

### Get Color Name from HEX

-**URL**: `https://www.thecolorapi.com/id`
-**Method**: `GET`
-**Query Parameters**:
  -`hex`: The HEX code of the color, without the `#` symbol.

#### Response

The response will be a JSON object that contains the color name, HEX value, RGB value, and more.

### Get Color Name from RGB

- **URL**: `https://www.thecolorapi.com/id`
- **Method**: `GET`
- **Query Parameters**:
  - `rgb`: The RGB values of the color in the format of `rgb(R,G,B)`.

#### Example Request

```http
GET https://www.thecolorapi.com/id?rgb=rgb(36,177,224)
```

## Usage in JavaScript

Here's how you might use this API in a JavaScript application:

```javascript
import axios from 'axios';

const getColorNameFromHex = async (hex) => {
  try {
    const response = await axios.get(`https://www.thecolorapi.com/id?hex=${hex.replace('#', '')}`);
    return response.data.name.value;
  } catch (error) {
    console.error('Error fetching the color name:', error);
    return hex; // Fallback to HEX if the name can't be fetched
  }
};

// Usage
getColorNameFromHex('24B1E0').then(colorName => {
  console.log(colorName); // Outputs the color name
});
```

## Notes

- The API does not require an API key for basic usage.
- You can find more information and additional endpoints in [The Color API Documentation](https://www.thecolorapi.com/docs).
