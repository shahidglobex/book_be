type zodError = [
  {
    code: string;
    expected: string;
    received: string;
    path: string[];
    message: string;
  },
];
