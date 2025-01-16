/*
 * Project:      invoices_api
 * Developed by: Juan David Pelaez Cumbe
 * Date:         15/01/25
 * Module name:  config
 * File name:    config.js
 * IDE:          WebStorm
 */

export const  {
    PORT = 1234,
    ACCESS_SECRET,
    SALT_ROUND= 10,
    JWT_SECRET,
    DATABASE_URL
} = process.env