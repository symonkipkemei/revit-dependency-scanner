import { DocItem } from '@/types/documentation'

export async function loadDocumentation(): Promise<DocItem[]> {
  try {
    // In a real app, this would load from your JSON files
    // For now, we'll return sample data
    return getSampleDocumentation()
  } catch (error) {
    console.error('Error loading documentation:', error)
    return []
  }
}

function getSampleDocumentation(): DocItem[] {
  return [
    {
      id: 'system',
      name: 'System',
      type: 'namespace',
      fullName: 'System',
      description: 'The System namespace contains fundamental classes and base classes.',
      children: ['system-string', 'system-int32', 'system-datetime']
    },
    {
      id: 'system-string',
      name: 'String',
      type: 'class',
      fullName: 'System.String',
      description: 'Represents text as a sequence of UTF-16 code units.',
      parentId: 'system',
      children: ['string-length', 'string-substring', 'string-contains']
    },
    {
      id: 'string-length',
      name: 'Length',
      type: 'property',
      fullName: 'System.String.Length',
      description: 'Gets the number of characters in the current String object.',
      parentId: 'system-string',
      returnType: 'int',
      syntax: 'public int Length { get; }',
      examples: [
        {
          title: 'Get string length',
          language: 'csharp',
          code: 'string text = "Hello World";\nint length = text.Length;\nConsole.WriteLine(length); // Output: 11',
          description: 'This example shows how to get the length of a string.'
        }
      ]
    },
    {
      id: 'string-substring',
      name: 'Substring',
      type: 'method',
      fullName: 'System.String.Substring',
      description: 'Retrieves a substring from this instance.',
      parentId: 'system-string',
      returnType: 'string',
      syntax: 'public string Substring(int startIndex, int length)',
      parameters: [
        {
          name: 'startIndex',
          type: 'int',
          description: 'The zero-based starting character position of a substring in this instance.'
        },
        {
          name: 'length',
          type: 'int',
          description: 'The number of characters in the substring.',
          optional: true
        }
      ],
      examples: [
        {
          title: 'Extract substring',
          language: 'csharp',
          code: 'string text = "Hello World";\nstring result = text.Substring(6, 5);\nConsole.WriteLine(result); // Output: World',
          description: 'Extract a portion of the string starting at index 6 with length 5.'
        }
      ]
    },
    {
      id: 'string-contains',
      name: 'Contains',
      type: 'method',
      fullName: 'System.String.Contains',
      description: 'Returns a value indicating whether a specified substring occurs within this string.',
      parentId: 'system-string',
      returnType: 'bool',
      syntax: 'public bool Contains(string value)',
      parameters: [
        {
          name: 'value',
          type: 'string',
          description: 'The string to seek.'
        }
      ],
      examples: [
        {
          title: 'Check if string contains substring',
          language: 'csharp',
          code: 'string text = "Hello World";\nbool contains = text.Contains("World");\nConsole.WriteLine(contains); // Output: True',
          description: 'Check if the string contains the specified substring.'
        }
      ]
    },
    {
      id: 'system-int32',
      name: 'Int32',
      type: 'class',
      fullName: 'System.Int32',
      description: 'Represents a 32-bit signed integer.',
      parentId: 'system',
      children: ['int32-parse', 'int32-tostring']
    },
    {
      id: 'int32-parse',
      name: 'Parse',
      type: 'method',
      fullName: 'System.Int32.Parse',
      description: 'Converts the string representation of a number to its 32-bit signed integer equivalent.',
      parentId: 'system-int32',
      returnType: 'int',
      syntax: 'public static int Parse(string s)',
      parameters: [
        {
          name: 's',
          type: 'string',
          description: 'A string containing a number to convert.'
        }
      ],
      examples: [
        {
          title: 'Parse string to integer',
          language: 'csharp',
          code: 'string numberString = "42";\nint number = int.Parse(numberString);\nConsole.WriteLine(number); // Output: 42',
          description: 'Convert a string representation of a number to an integer.'
        }
      ]
    },
    {
      id: 'int32-tostring',
      name: 'ToString',
      type: 'method',
      fullName: 'System.Int32.ToString',
      description: 'Converts the numeric value of this instance to its equivalent string representation.',
      parentId: 'system-int32',
      returnType: 'string',
      syntax: 'public override string ToString()',
      examples: [
        {
          title: 'Convert integer to string',
          language: 'csharp',
          code: 'int number = 42;\nstring text = number.ToString();\nConsole.WriteLine(text); // Output: "42"',
          description: 'Convert an integer to its string representation.'
        }
      ]
    }
  ]
}
