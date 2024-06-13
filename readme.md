# otpify

otpify is a Node.js package for generating and verifying one-time passwords (OTPs) with enhanced security and additional features.

## Features

- **Enhanced Security**:
  - Support for a secret key for generating OTPs, adding an extra layer of security.
  - Hashing of generated OTPs using SHA-256 for secure storage

- **Improved Functionality**:
  - Configurable OTP length.
  - Support for different character sets (numeric, alphanumeric) for OTPs.

- **Additional Features**:
  - Robust error handling with informative error messages.
  - Customizable OTP expiry time.

## Installation

You can install the package via npm:

npm install otp-generator

## Usage

const { generateOTP, verifyOTP } = require('otp-generator');

// Generate an OTP with default options
const { otp, expiryTimestamp, hashedOTP } = generateOTP();
console.log('Generated OTP:', otp);

// Generate an OTP with custom options
const options = {
  secretKey: 'mysecretkey',
  length: 8,
  charset: 'alphanumeric',
  expiryTime: 600 // 10 minutes
};
const { otp, expiryTimestamp, hashedOTP } = generateOTP(options);
console.log('Generated OTP:', otp);

// Verify an OTP
const isValid = verifyOTP(otp, hashedOTP, expiryTimestamp, options.secretKey);
console.log('OTP is valid:', isValid);

### `generateOTP(options)`

Generates a new OTP with the specified options.

**Options:**

- `secretKey` (string, optional): The secret key for generating OTPs. Adds an extra layer of security.
- `length` (number, default: 6): The desired length of the OTP.
- `charset` (string, default: 'numeric'): The character set for the OTP. Can be 'numeric' or 'alphanumeric'.
- `expiryTime` (number, default: 300): The expiry time for the OTP in seconds.

**Returns:** An object containing the `otp` (string), `expiryTimestamp` (number), and `hashedOTP` (string).

### `verifyOTP(otp, hashedOTP, expiryTimestamp, secretKey)`

Verifies the validity of an OTP.

**Parameters:**

- `otp` (string): The OTP to be verified.
- `hashedOTP` (string): The hashed value of the OTP for comparison.
- `expiryTimestamp` (number): The expiry timestamp of the OTP.
- `secretKey` (string, optional): The secret key used for generating the OTP.

**Returns:** `true` if the OTP is valid, `false` otherwise.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
