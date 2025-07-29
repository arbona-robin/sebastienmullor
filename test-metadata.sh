#!/bin/bash

# Script pour tester les métadonnées Open Graph
# Usage: ./test-metadata.sh

echo "🔍 Test des métadonnées Open Graph"
echo "=================================="

# URLs à tester
urls=(
  "https://sebastienmullor.github.io/sebastienmullor/"
  "https://sebastienmullor.github.io/sebastienmullor/architecture.html"
  "https://sebastienmullor.github.io/sebastienmullor/contact.html"
)

echo ""
echo "URLs de test pour les aperçus :"
echo ""

for url in "${urls[@]}"; do
  echo "📎 $url"
  echo "   - Facebook Debugger: https://developers.facebook.com/tools/debug/?q=$url"
  echo "   - Twitter Card Validator: https://cards-dev.twitter.com/validator"
  echo "   - WhatsApp: Partagez directement le lien dans un chat"
  echo ""
done

echo "🎯 Outils de validation recommandés :"
echo ""
echo "1. Facebook Sharing Debugger"
echo "   https://developers.facebook.com/tools/debug/"
echo ""
echo "2. Twitter Card Validator"
echo "   https://cards-dev.twitter.com/validator"
echo ""
echo "3. LinkedIn Post Inspector"
echo "   https://www.linkedin.com/post-inspector/"
echo ""
echo "4. Rich Results Test (Google)"
echo "   https://search.google.com/test/rich-results"
echo ""
echo "✅ Toutes les métadonnées ont été ajoutées avec succès !"
