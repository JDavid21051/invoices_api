export const StatusCodes = Object.freeze({
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.2.1
     *
     * This interim response indicates that everything so far is OK and that the client should continue with the request or ignore it if it is already finished.
     */
    Continue: 100,
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.2.2
     *
     * This code is sent in response to an Upgrade request header by the client, and indicates the protocol the server is switching too.
     */
    SwitchingProtocols: 101,
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.1
     *
     * This code indicates that the server has received and is processing the request, but no response is available yet.
     */
    Processing: 102,
    /**
     * Official Documentation @ https://www.rfc-editor.org/rfc/rfc8297#page-3
     *
     * This code indicates to the client that the server is likely to send a final response with the header fields included in the informational response.
     */
    EarlyHints: 103,
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.1
     *
     * The request has succeeded. The meaning of a success varies depending on the HTTP method:
     * GET: The resource has been fetched and is transmitted in the message body.
     * HEAD: The entity headers are in the message body.
     * POST: The resource describing the result of the action is transmitted in the message body.
     * TRACE: The message body contains the request message as received by the server
     */
    Ok: 200,
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.2
     *
     * The request has succeeded and a new resource has been created as a result of it. This is typically the response sent after a PUT request.
     */
    Created: 201,
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.3
     *
     * The request has been received but not yet acted upon. It is non-committal, meaning that there is no way in HTTP to later send an asynchronous response indicating the outcome of processing the request. It is intended for cases where another process or server handles the request, or for batch processing.
     */
    Accepted: 202,
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.4
     *
     * This response code means returned meta-information set is not exact set as available from the origin server, but collected from a local or a third party copy. Except this condition, 200 OK response should be preferred instead of this response.
     */
    NonAuthoritativeInformation: 203,
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.5
     *
     * There is no content to send for this request, but the headers may be useful. The user-agent may update its cached headers for this resource with the new ones.
     */
    NoContent: 204,
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.6
     *
     * This response code is sent after accomplishing request to tell user agent reset document view which sent this request.
     */
    ResetContent: 205,
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7233#section-4.1
     *
     * This response code is used because of range header sent by the client to separate download into multiple streams.
     */
    PartialContent: 206,
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.2
     *
     * A Multi-Status response conveys information about multiple resources in situations where multiple status codes might be appropriate.
     */
    MultiStatus: 207,
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.4.1
     *
     * The request has more than one possible responses. User-agent or user should choose one of them. There is no standardized way to choose one of the responses.
     */
    MultipleChoices: 300,
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.4.2
     *
     * This response code means that URI of requested resource has been changed. Probably, new URI would be given in the response.
     */
    MovedPermanently: 301,
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.4.3
     *
     * This response code means that URI of requested resource has been changed temporarily. New changes in the URI might be made in the future. Therefore, this same URI should be used by the client in future requests.
     */
    MovedTemporarily: 302,
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.4.4
     *
     * Server sent this response to directing client to get requested resource to another URI with an GET request.
     */
    SeeOther: 303,
    // code 400
    BadRequest: 400,
    // code 401
    Unauthorized: 401,
    // code 402
    PaymentRequired: 402,
    // code 403
    Forbidden: 403,
    // code 404
    NotFound: 404,
    // code 405
    MethodNotAllowed: 405,
    // code 406
    NotAcceptable: 406,
    // code 407
    ProxyAuthenticationRequired: 407,
    // code 408
    RequestTimeout: 408,
    // code 409
    Conflict: 409,
    // code 410
    Gone: 410,
    // code 411
    LengthRequired: 411,
    // code 412
    PreconditionFailed: 412,
    // code 413
    PayloadTooLarge: 413,
    // code 414
    UriTooLong: 414,
    // code 415
    UnsupportedMediaType: 415,
    // code 416
    RangeNotSatisfiable: 416,
    // code 417
    ExpectationFailed: 417,
    // code 418
    ImATeapot: 418,
    // code 421
    MisdirectedRequest: 421,
    UnprocessableEntity: 422,
    Locked: 423,
    FailedDependency: 424,
    TooEarly: 425,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    UnavailableForLegalReasons: 451,
    // code 500
    InternalServerError: 500,
    // code 501
    NotImplemented: 501,
    // code 502
    BadGateway: 502,
    // code 503
    ServiceUnavailable: 503,
    // code 504
    GatewayTimeout: 504,
    // code 505
    HttpVersionNotSupported: 505,
    // code 506
    VariantAlsoNegotiates: 506,
    // code 507
    InsufficientStorage: 507,
    // code 508
    LoopDetected: 508,
    // code 510
    NotExtended: 510,
    // code 511
    NetworkAuthenticationRequired: 511,
});
