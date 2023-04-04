import re
from pylatexenc.latexwalker import LatexWalker, LatexEnvironmentNode

def gpt_query_paragraph(text):
    res = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    temperature = 0.3,
    messages=[
  {"role": "system", "content": "You are a helpful assistant that translates English to French."},
  {"role": "user", "content": text}],)
    return res.choices[0].message

def parse_one_file(file_name):
    # read all files from dict 
    print("parsing "+ file_name)
    paragraphs = []
    with open(file_name, "r") as file:
      content = file.read()
      # Remove comments from the content
      # content = re.sub(r'%.*$', '', content, flags=re.MULTILINE)

      walker = LatexWalker(content)
      nodes, pos, len_ = walker.get_latex_nodes(pos=0)

      paragraphs = []

      for node in nodes:
          if isinstance(node, LatexEnvironmentNode) and node.environmentname == 'document':
              for child_node in node.nodelist:
                  if child_node.isNodeType('text'):
                      text_content = child_node.content.strip()
                      if len(text_content) > 0:
                          paragraphs.append(text_content)

    print(paragraphs)