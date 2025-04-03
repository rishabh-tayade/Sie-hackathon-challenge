```mermaid
graph LR
    A[Input Data] -->|Divide into chunks| B[Polynomial Division]
    B -->|Generate Remainder| C[CRC Remainder]
    C -->|Append to Input Data| D[Transmitted Data]
    D -->|Receiver Performs Same Division| E[Check Remainder]
    E -->|Remainder is Zero| F[Data is Valid]
    E -->|Remainder is Non-Zero| G[Data is Corrupted]